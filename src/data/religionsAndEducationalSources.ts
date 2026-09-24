export interface ReligionInfo {
  id: string;
  name: string;
  category: string;
  badge: string;
  color: string;
  summary: string;
  philippineContext: string;
  coreBeliefs: string[];
  sacredTexts: string[];
  majorCelebrations: string[];
  valuesEducationAlignment: string;
  verifiedSources: { title: string; url: string; org: string }[];
}

export interface EducationalSourceCategory {
  subject: string;
  recommendedSource: string;
  url: string;
  description: string;
  sampleTopics: string[];
}

export const OFFICIAL_EDUCATIONAL_SOURCES: EducationalSourceCategory[] = [
  {
    subject: "Science",
    recommendedSource: "PhET Simulations (translated), DepEd Commons",
    url: "https://phet.colorado.edu",
    description: "Interactive HTML5 science and math simulations developed by the University of Colorado Boulder, fully translated for classroom demonstrations.",
    sampleTopics: ["Photosynthesis", "Plate Tectonics", "Atomic Structure", "Ohm's Law", "Genetics"]
  },
  {
    subject: "Math",
    recommendedSource: "Khan Academy, Math-Drills",
    url: "https://khanacademy.org",
    description: "Mastery-based personalized learning, comprehensive problem sets, fraction drills, and step-by-step video tutorials.",
    sampleTopics: ["Polynomial Factoring", "Fraction Word Problems", "Trigonometric Ratios", "Statistics & Probability"]
  },
  {
    subject: "Philippine History",
    recommendedSource: "NHCP (National Historical Commission of the Philippines), National Museum",
    url: "https://nhcp.gov.ph",
    description: "Primary historical documents, official national accounts, archival records of the 1896 Philippine Revolution, and cultural artifacts.",
    sampleTopics: ["1896 Philippine Revolution", "Rizal's Works", "Pre-colonial Philippine Polities", "Constitution Formation"]
  },
  {
    subject: "MAPEH",
    recommendedSource: "DepEd Commons, CCP (Cultural Center of the Philippines)",
    url: "https://culturalcenter.gov.ph",
    description: "Philippine folk dances, indigenous music collections, visual arts archives, and physical education fitness frameworks.",
    sampleTopics: ["Traditional Folk Dances (Tinikling, Singkil)", "Philippine Rondalla", "Health & Nutrition Matrix"]
  },
  {
    subject: "Filipino",
    recommendedSource: "Komisyon sa Wikang Filipino (KWF), UP Diksiyonaryo",
    url: "https://kwf.gov.ph",
    description: "Official orthographic guidelines, standard Filipino grammar rules (Balarila), etymology, and modern vocabulary registries.",
    sampleTopics: ["Pang-abay at Pang-uri", "Ponolohiya at Morpolohiya", "Panitikang Rehiyonal", "Ortograpiyang Pambansa"]
  },
  {
    subject: "Values Education / ESP / World Religions",
    recommendedSource: "DepEd Learning Resources (LRMDS)",
    url: "https://lrmds.deped.gov.ph",
    description: "Edukasyon sa Pagpapakatao modules, World Religions and Belief Systems exemplar plans, ethics, and peace education.",
    sampleTopics: ["Inter-faith Dialogue", "Ethical Decision Making", "Respect for Cultural Diversity", "Pambansang Pagkakaisa"]
  }
];

export const WORLD_RELIGIONS_DATA: ReligionInfo[] = [
  {
    id: "catholicism",
    name: "Roman Catholicism",
    category: "Christianity (Major Philippine Tradition)",
    badge: "Major Tradition in PH (~79%)",
    color: "blue",
    summary: "Roman Catholicism is the largest Christian church and the majority faith in the Philippines, introduced in 1521. It centers on faith in Jesus Christ as the Son of God and Savior, guided by the Holy See in Rome.",
    philippineContext: "Deeply interwoven with Filipino culture, traditions like Simbang Gabi, Fiesta celebrations, and the historical struggle for national identity (e.g., GOMBURZA, EDSA 1986).",
    coreBeliefs: [
      "Belief in the Holy Trinity (One God in Three Persons: Father, Son, and Holy Spirit).",
      "Sacraments as outward signs of inward grace (Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, Matrimony).",
      "Apostolic Succession and the Magisterium under the Pope.",
      "Emphasis on faith expressed through love, social justice, and charity (Caritas)."
    ],
    sacredTexts: ["The Holy Bible (Old and New Testaments with Deuterocanonical Books)", "Catechism of the Catholic Church (CCC)"],
    majorCelebrations: ["Christmas (Pasko)", "Holy Week (Mahal na Araw / Pasko ng Pagkabuhay)", "Feast of the Black Nazarene", "Sinulog & Ati-Atihan"],
    valuesEducationAlignment: "Focuses on compassion (habag), sanctity of life, family solidarity, and active civic responsibility.",
    verifiedSources: [
      { title: "Vatican Official Portal", url: "https://www.vatican.va", org: "Holy See" },
      { title: "Catholic Bishops' Conference of the Philippines (CBCP)", url: "https://cbcpnews.net", org: "CBCP" },
      { title: "DepEd World Religions Curriculum", url: "https://lrmds.deped.gov.ph", org: "DepEd LRMDS" }
    ]
  },
  {
    id: "islam",
    name: "Islam",
    category: "Abrahamic Faith (Historic Philippine Heritage)",
    badge: "Historic Heritage (~6-10% PH)",
    color: "emerald",
    summary: "Islam is a monotheistic Abrahamic religion founded on the revelation of God (Allah) through the Prophet Muhammad (Peace Be Upon Him) in 7th-century Arabia, with a rich 700+ year history in Mindanao and Sulu.",
    philippineContext: "Arrived in the Philippines in the 13th-14th century (via Tawi-Tawi through Karim ul-Makhdum). The Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) preserves rich Islamic cultural heritage and jurisprudence.",
    coreBeliefs: [
      "Tawhid (Absolute Oneness of Allah).",
      "Belief in the Five Pillars of Islam: Shahada (Faith), Salah (Prayer 5x daily), Zakat (Almsgiving), Sawm (Fasting during Ramadan), and Hajj (Pilgrimage to Mecca).",
      "Belief in Angels, Prophets (including Adam, Ibrahim, Musa, Isa, and Muhammad PBUH as the Final Prophet), and Day of Judgment.",
      "Adherence to the Quran and Sunnah (sayings/practices of the Prophet)."
    ],
    sacredTexts: ["The Noble Quran", "Hadith Collections (Sahih Bukhari, Sahih Muslim, etc.)"],
    majorCelebrations: ["Eid al-Fitr (Festival of Breaking the Fast)", "Eid al-Adha (Festival of the Sacrifice)", "Isra and Mi'raj", "Maulid un-Nabi"],
    valuesEducationAlignment: "Encourages discipline, honesty (Amanah), communal solidarity (Ummah), peace (Salam), and justice (Adl).",
    verifiedSources: [
      { title: "National Commission on Muslim Filipinos (NCMF)", url: "https://ncmf.gov.ph", org: "NCMF Philippines" },
      { title: "BARMM Ministry of Basic, Higher and Technical Education", url: "https://mbhte.bangsamoro.gov.ph", org: "BARMM DepEd" },
      { title: "DepEd Madrasah Education Program (MEP)", url: "https://deped.gov.ph", org: "DepEd Central" }
    ]
  },
  {
    id: "jehovahs_witnesses",
    name: "Jehovah's Witnesses",
    category: "Christian Denomination / Restorationist",
    badge: "Active Community in PH (~250k+)",
    color: "purple",
    summary: "Jehovah's Witnesses are a worldwide Christian denomination that emerged in the late 19th century, characterized by active door-to-door evangelism, strict adherence to biblical scripture, and neutral civic stance.",
    philippineContext: "Active in the Philippines since the early 20th century with congregations (Kingdom Halls) nationwide, known for their voluntary community Bible education and free literature in Tagalog, Cebuano, Ilocano, and other Philippine languages.",
    coreBeliefs: [
      "Worship of Jehovah as the only true Almighty God.",
      "Jesus Christ is the Son of God, his first creation and ransom sacrifice, but distinct from and subordinate to Jehovah.",
      "The Bible is the inspired word of God and the ultimate guide for daily living and moral integrity.",
      "Belief in God's Kingdom as a real government that will restore Earth to a peaceful paradise.",
      "Strict political neutrality and non-participation in warfare based on Christian love."
    ],
    sacredTexts: ["The Holy Scriptures (New World Translation of the Holy Scriptures)"],
    majorCelebrations: ["Memorial of Christ's Death (The Lord's Evening Meal / Annual Commemoration)"],
    valuesEducationAlignment: "Emphasizes strict moral purity, truthfulness, strong family units, peaceful dispute resolution, and community literacy.",
    verifiedSources: [
      { title: "Official Website of Jehovah's Witnesses", url: "https://www.jw.org", org: "Watch Tower Society" },
      { title: "JW.ORG Tagalog / Cebuano Section", url: "https://www.jw.org/tl", org: "JW Global Publications" },
      { title: "DepEd Religious Freedom in Schools Guidelines", url: "https://deped.gov.ph", org: "DepEd Legal" }
    ]
  },
  {
    id: "buddhism",
    name: "Buddhism",
    category: "Dharmic / Eastern Spiritual Tradition",
    badge: "Universal Philosophy & Tradition",
    color: "amber",
    summary: "Buddhism is an ancient spiritual tradition and philosophy founded by Siddhartha Gautama (the Buddha) in 6th-century BCE ancient India. It focuses on personal spiritual development and the attainment of deep insight into the true nature of reality.",
    philippineContext: "Present through Chinese-Filipino communities (Seng Guan Temple in Tondo, Fo Guang Shan Mabuhay Temple in Manila, Chu Un Temple in Cebu) and modern mindfulness/meditation practitioners across the country.",
    coreBeliefs: [
      "The Four Noble Truths: Dukkha (Life involves suffering/unsatisfactoriness), Samudaya (Origin of suffering is craving/attachment), Nirodha (End of suffering is attainable / Nirvana), Magga (The Eightfold Path leads to the end of suffering).",
      "The Noble Eightfold Path: Right View, Right Resolve, Right Speech, Right Action, Right Livelihood, Right Effort, Right Mindfulness, Right Concentration.",
      "Karma (Law of cause and effect) and Samsara (Cycle of rebirth).",
      "Anicca (Impermanence) and Karuna (Universal compassion for all sentient beings)."
    ],
    sacredTexts: ["Tipitaka / Pali Canon", "Mahayana Sutras (Heart Sutra, Lotus Sutra, Diamond Sutra)", "Dhammapada"],
    majorCelebrations: ["Vesak Day (Buddha Day — Birth, Enlightenment, and Parinirvana)", "Asalha Puja (Dhamma Day)", "Ullambana / Ghost Festival"],
    valuesEducationAlignment: "Cultivates mindfulness, non-violence (Ahimsa), empathy, ecological stewardship, and emotional balance.",
    verifiedSources: [
      { title: "World Buddhist Directory", url: "https://www.buddhanet.net", org: "BuddhaNet" },
      { title: "Fo Guang Shan Mabuhay Temple Philippines", url: "https://fgsmanila.org", org: "FGS Philippines" },
      { title: "DepEd Introduction to World Religions CG", url: "https://lrmds.deped.gov.ph", org: "DepEd LRMDS" }
    ]
  }
];

export const HELP_TOPICS_GUIDE = [
  {
    category: "Explain Concepts",
    exampleQuery: "Explain photosynthesis for Grade 7",
    description: "Breaks down complex scientific, mathematical, or social science theories into age-appropriate, easy-to-understand explanations with everyday examples."
  },
  {
    category: "Practice Problems",
    exampleQuery: "Give me fraction word problems with solutions",
    description: "Generates step-by-step problem sets, drills, multiple-choice quizzes, and worked-out answer keys aligned with DepEd competencies."
  },
  {
    category: "Historical Facts",
    exampleQuery: "What happened during the 1896 Philippine Revolution?",
    description: "Delivers accurate, source-grounded historical narratives citing NHCP, primary documents, and standard curriculum milestones."
  },
  {
    category: "Filipino Grammar",
    exampleQuery: "Explain 'pang-abay' with examples and sentences",
    description: "Provides grammatical rules, classifications (pamanahon, panlunan, pamaraan), and usage exemplars based on Komisyon sa Wikang Filipino guidelines."
  }
];
