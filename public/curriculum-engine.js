/**
 * BOISER App — Curriculum Engine
 * -------------------------------
 * Scans DepEd subjects/competencies per grade level (K-6, 7-10, 11-12),
 * caches them offline in IndexedDB, and re-syncs automatically when a
 * new DepEd calendar is detected. If no BOW exists locally for a
 * grade/subject, it asks the model to search official DepEd sources
 * and extract the competencies before building the BOW.
 *
 * Drop this file in alongside index.html / sw.js and import it as a
 * module: <script type="module" src="curriculum-engine.js"></script>
 */

const DB_NAME = "boiser-curriculum";
const DB_VERSION = 1;
const STORE_BOW = "bow";          // key: grade|subject|schoolYear
const STORE_CALENDAR = "calendar"; // key: "current"
const STORE_QUEUE = "queue";       // key: auto-increment

const API_ENDPOINT = "/api/curriculum"; // point this at your backend proxy
                                          // that holds the real API key —
                                          // never call api.anthropic.com
                                          // directly from client JS.

// ---------------------------------------------------------------------
// SYSTEM PROMPT
// ---------------------------------------------------------------------
export const CURRICULUM_SYSTEM_PROMPT = `
You are the BOISER App Curriculum Engine, a DepEd (Philippines) curriculum-
alignment assistant embedded in a PWA used by teachers.

GOAL
Given (a) a grade level, (b) a subject, and (c) the current DepEd School
Calendar, produce or update the Budget of Work (BOW) — the full list of
weekly learning competencies — for that grade/subject, mapped onto the
calendar's terms and weeks.

SCOPE: K to Grade 6, Grades 7 to 10, and Grades 11 to 12 (Core, Applied,
and every Specialized track: Academic, TVL, Sports, Arts & Design).

IF YOU DO NOT ALREADY HAVE THE COMPETENCIES FOR THIS EXACT GRADE/SUBJECT
(no curriculum_guide_reference was supplied and none is cached):
  1. Use the web_search tool now. Search official DepEd sources first —
     deped.gov.ph, DepEd Bureau of Curriculum Development, regional/division
     DepEd memo pages, and official MELC (Most Essential Learning
     Competencies) PDFs — for this grade level and subject.
  2. Extract the competencies and, where available, their MELC/Curriculum
     Guide codes.
  3. Populate curriculum_guide_reference yourself from what you extracted,
     then proceed to build the BOW as normal.
  4. If, after searching, you still cannot confirm official competencies,
     do not invent them — return an empty weeks array for that subject and
     explain why in "notes".

BEHAVIOR RULES
1. Never invent competencies not found in an official source.
2. Calendar-driven, not date-hardcoded: compute week numbers and date
   ranges FROM deped_calendar.terms every time. A new calendar always
   overrides old dates.
3. If existing_bow is supplied and only the calendar changed, keep the
   competency sequence identical; only shift week numbers/dates around
   the new term boundaries and holidays.
4. Respect each term's actual week count from deped_calendar — don't
   assume uniform term lengths.
5. Output ONLY the JSON object below. No markdown, no commentary outside it.

OUTPUT FORMAT
{
  "grade_level": "...",
  "subject": "...",
  "school_year": "...",
  "calendar_source": "...",
  "source_urls": ["..."],
  "terms": [
    {
      "term": 1,
      "weeks": [
        {
          "week": 1,
          "date_range": "YYYY-MM-DD to YYYY-MM-DD",
          "competencies": ["..."],
          "competency_codes": ["..."]
        }
      ]
    }
  ],
  "notes": "flag anything unconfirmed here"
}
`.trim();

// ---------------------------------------------------------------------
// INDEXEDDB HELPERS
// ---------------------------------------------------------------------
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_BOW)) db.createObjectStore(STORE_BOW);
      if (!db.objectStoreNames.contains(STORE_CALENDAR)) db.createObjectStore(STORE_CALENDAR);
      if (!db.objectStoreNames.contains(STORE_QUEUE)) db.createObjectStore(STORE_QUEUE, { autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly").objectStore(store).get(key);
    tx.onsuccess = () => resolve(tx.result ?? null);
    tx.onerror = () => reject(tx.error);
  });
}

async function idbSet(store, key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite").objectStore(store).put(value, key);
    tx.onsuccess = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbAll(store) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const objStore = db.transaction(store, "readonly").objectStore(store);
    const items = [];
    objStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        items.push({ key: cursor.key, value: cursor.value });
        cursor.continue();
      } else {
        resolve(items);
      }
    };
    objStore.openCursor().onerror = (e) => reject(e.target.error);
  });
}

async function idbDelete(store, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite").objectStore(store).delete(key);
    tx.onsuccess = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function bowKey(gradeLevel, subject, schoolYear) {
  return `${gradeLevel}|${subject}|${schoolYear}`;
}

// ---------------------------------------------------------------------
// API CALL (with web-search fallback for missing competencies)
// ---------------------------------------------------------------------
async function callCurriculumAPI({ gradeLevel, subject, calendar, existingBow, curriculumGuideReference }) {
  const userPayload = {
    grade_level: gradeLevel,
    subject,
    deped_calendar: calendar,
    curriculum_guide_reference: curriculumGuideReference ?? null,
    existing_bow: existingBow ?? null,
  };

  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: CURRICULUM_SYSTEM_PROMPT,
      user: JSON.stringify(userPayload),
      allow_web_search: !curriculumGuideReference, // only search when we have no local data
    }),
  });

  if (!res.ok) throw new Error(`Curriculum API error: ${res.status}`);
  const data = await res.json();
  return data.bow; // your backend proxy should return the parsed JSON BOW directly
}

// ---------------------------------------------------------------------
// PUBLIC API
// ---------------------------------------------------------------------

/** Get (or generate) the BOW for one grade/subject, offline-first. */
export async function getBOW({ gradeLevel, subject, calendar }) {
  const key = bowKey(gradeLevel, subject, calendar.school_year);
  const cached = await idbGet(STORE_BOW, key);
  const cachedCalendar = await idbGet(STORE_CALENDAR, "current");

  const calendarChanged = cachedCalendar && cachedCalendar.order_no !== calendar.order_no;

  if (cached && !calendarChanged) {
    return cached; // fast path — fully offline
  }

  if (!navigator.onLine) {
    if (cached) return cached; // stale but usable offline
    await idbSet(STORE_QUEUE, undefined, { gradeLevel, subject, calendar, queuedAt: Date.now() });
    return null; // nothing to show yet — will sync when back online
  }

  // Online: (re)generate. Reuse the cached BOW as existing_bow so a
  // calendar-only change just re-dates it instead of regenerating.
  const fresh = await callCurriculumAPI({
    gradeLevel,
    subject,
    calendar,
    existingBow: calendarChanged ? cached : null,
    curriculumGuideReference: cached ? cached : null,
  });

  await idbSet(STORE_BOW, key, fresh);
  await idbSet(STORE_CALENDAR, "current", calendar);
  return fresh;
}

/** Scan every subject for a grade level in one pass (used on first load
 *  or when a teacher opens a grade tab with nothing cached yet). */
export async function seedAllSubjectsForGrade({ gradeLevel, subjects, calendar }) {
  const results = {};
  for (const subject of subjects) {
    try {
      results[subject] = await getBOW({ gradeLevel, subject, calendar });
    } catch (err) {
      console.error(`Failed to load BOW for ${gradeLevel} / ${subject}`, err);
      results[subject] = null;
    }
  }
  return results;
}

/** Call this whenever the app receives a new/updated DepEd calendar
 *  (e.g. new DepEd Order number). Invalidates cached BOWs so they get
 *  re-dated (not re-generated from scratch) next sync. */
export async function applyNewCalendar(calendar) {
  await idbSet(STORE_CALENDAR, "current", calendar);
  // BOWs are lazily re-dated the next time getBOW() is called for them,
  // via the calendarChanged check above — no need to wipe the cache.
}

/** Process any requests that were queued while offline. Call this on
 *  the 'online' event and once at app startup. */
export async function syncQueuedRequests() {
  if (!navigator.onLine) return;
  const queued = await idbAll(STORE_QUEUE);
  for (const { key, value } of queued) {
    try {
      const fresh = await callCurriculumAPI({
        gradeLevel: value.gradeLevel,
        subject: value.subject,
        calendar: value.calendar,
        existingBow: null,
        curriculumGuideReference: null,
      });
      const bowStoreKey = bowKey(value.gradeLevel, value.subject, value.calendar.school_year);
      await idbSet(STORE_BOW, bowStoreKey, fresh);
      await idbDelete(STORE_QUEUE, key);
    } catch (err) {
      console.error("Sync failed for queued item, will retry later:", err);
      // leave it in the queue for the next sync pass
    }
  }
}

// Auto-sync whenever connectivity returns.
window.addEventListener("online", () => {
  syncQueuedRequests();
});
