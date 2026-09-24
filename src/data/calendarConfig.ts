export interface TermCalendarConfig {
  term: 'Term 1' | 'Term 2' | 'Term 3';
  termNumber: 1 | 2 | 3;
  schoolYear: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  holidays: string[]; // List of YYYY-MM-DD strings
}

/**
 * Official DepEd Three-Term Calendar for SY 2026–2027 (DepEd Order No. 009, s. 2026).
 * 3-Term Trimester System applied uniformly across K–12.
 */
export const DEPED_2026_CALENDAR_CONFIG: Record<'Term 1' | 'Term 2' | 'Term 3', TermCalendarConfig> = {
  'Term 1': {
    term: 'Term 1',
    termNumber: 1,
    schoolYear: '2026-2027',
    startDate: '2026-06-16',
    endDate: '2026-09-25',
    holidays: [
      '2026-06-12', // Independence Day
      '2026-08-21', // Ninoy Aquino Day
      '2026-08-31', // National Heroes Day
    ]
  },
  'Term 2': {
    term: 'Term 2',
    termNumber: 2,
    schoolYear: '2026-2027',
    startDate: '2026-10-05',
    endDate: '2027-01-08',
    holidays: [
      '2026-11-01', // All Saints' Day
      '2026-11-02', // All Souls' Day
      '2026-11-30', // Bonifacio Day
      '2026-12-08', // Feast of the Immaculate Conception
      '2026-12-21', '2026-12-22', '2026-12-23', '2026-12-24', '2026-12-25', // Christmas Break
      '2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01'  // New Year Break
    ]
  },
  'Term 3': {
    term: 'Term 3',
    termNumber: 3,
    schoolYear: '2026-2027',
    startDate: '2027-01-18',
    endDate: '2027-04-16',
    holidays: [
      '2027-02-25', // EDSA People Power Revolution Anniversary
      '2027-03-25', // Maundy Thursday
      '2027-03-26', // Good Friday
      '2027-04-09', // Araw ng Kagitingan (Day of Valor)
    ]
  }
};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Pure function: computeDate(termStartDate, weekNumber, holidays[], sessionsCount)
 * 
 * Computes official inclusive teaching dates for a given school week:
 * - Starts counting from term's official start date
 * - Excludes weekends (Saturday & Sunday)
 * - Excludes declared holidays
 * - Calculates the dates for the specified week number and session count
 */
export function computeDate(
  termStartDate: string | undefined | null,
  weekNumber: number,
  holidays: string[] = [],
  sessionsCount: number = 4
): string {
  if (!termStartDate || typeof termStartDate !== 'string' || termStartDate.trim() === '') {
    return '⚠ Confirm Term start date';
  }

  const sessionDates = computeSessionDates(termStartDate, weekNumber, holidays, sessionsCount);
  if (!sessionDates || sessionDates.length === 0) {
    return '⚠ Confirm Term start date';
  }

  if (sessionDates.length === 1) {
    const d = sessionDates[0];
    return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  const first = sessionDates[0];
  const last = sessionDates[sessionDates.length - 1];

  const sameMonth = first.getMonth() === last.getMonth();
  const sameYear = first.getFullYear() === last.getFullYear();

  if (sameYear && sameMonth) {
    return `${MONTH_NAMES[first.getMonth()]} ${first.getDate()}–${last.getDate()}, ${first.getFullYear()}`;
  } else if (sameYear) {
    return `${MONTH_NAMES[first.getMonth()]} ${first.getDate()} – ${MONTH_NAMES[last.getMonth()]} ${last.getDate()}, ${first.getFullYear()}`;
  } else {
    return `${MONTH_NAMES[first.getMonth()]} ${first.getDate()}, ${first.getFullYear()} – ${MONTH_NAMES[last.getMonth()]} ${last.getDate()}, ${last.getFullYear()}`;
  }
}

/**
 * Returns an array of Date objects representing the exact class session days for the week.
 */
export function computeSessionDates(
  termStartDate: string,
  weekNumber: number,
  holidays: string[] = [],
  sessionsCount: number = 4
): Date[] {
  const parts = termStartDate.split('-');
  if (parts.length !== 3) return [];
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const holidaySet = new Set(holidays);

  let currentDate = new Date(year, month, day);
  let currentWeek = 1;
  let daysInCurrentWeek = 0;
  let targetWeekDates: Date[] = [];

  // Limit iterations to prevent infinite loop (safety threshold: 300 days)
  let iterations = 0;
  while (currentWeek <= weekNumber && iterations < 300) {
    iterations++;
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    const yyyymmdd = formatDateISO(currentDate);

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidaySet.has(yyyymmdd);

    if (!isWeekend && !isHoliday) {
      if (currentWeek === weekNumber) {
        targetWeekDates.push(new Date(currentDate));
        if (targetWeekDates.length >= sessionsCount) {
          break;
        }
      }
      daysInCurrentWeek++;
      // Once we reach 5 school days or end of week Friday, move to next week
      if (dayOfWeek === 5 || daysInCurrentWeek >= 5) {
        currentWeek++;
        daysInCurrentWeek = 0;
      }
    } else if (dayOfWeek === 5 && daysInCurrentWeek > 0) {
      // Friday passed even if holiday or weekend
      currentWeek++;
      daysInCurrentWeek = 0;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return targetWeekDates;
}

function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
