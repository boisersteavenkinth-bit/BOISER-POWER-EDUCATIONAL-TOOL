export interface MasterCreatorSkill {
  id: string;
  name: string;
  fileName: string;
  description: string;
  category: 'Design & Branding' | 'AI & Content Generation' | 'Pedagogy & Cognitive' | 'System & Integration';
  location: string;
  isActive: boolean;
  version: string;
  updatedDate: string;
  author: string;
}

export const INITIAL_MASTER_CREATOR_SKILLS: MasterCreatorSkill[] = [
  {
    id: 'brand-book',
    name: 'Brand Book Identity System',
    fileName: 'brand-book.md',
    description: 'Comprehensive brand identity reference, logo rules, color tokens (Primary Blue #1783FF), 60-30-10 rule, typography, and dark mode specs.',
    category: 'Design & Branding',
    location: '/src/skills/master_creator_skills/brand-book.md',
    isActive: true,
    version: '1.0',
    updatedDate: '2026-08-20',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'fashion-lookbook-system',
    name: 'Fashion Lookbook Content System',
    fileName: 'fashion-lookbook-system.md',
    description: 'Repeatable fashion content system with garment breakdowns, multi-angle prompt generators, fabric specs, GSM weights, and blueprint visual formatting.',
    category: 'AI & Content Generation',
    location: '/src/skills/master_creator_skills/fashion-lookbook-system.md',
    isActive: true,
    version: '1.0.0',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'claude-pedagogical-skills',
    name: 'Claude Advanced Pedagogical Engine',
    fileName: 'claude-pedagogical-skills.md',
    description: 'Claude constitutional reasoning, recursive lesson scaffolding, ILAW Phase 1-4 decomposition, and UDL accessibility checks.',
    category: 'Pedagogy & Cognitive',
    location: '/src/skills/master_creator_skills/claude-pedagogical-skills.md',
    isActive: true,
    version: '2.4',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'opus-impact-skills',
    name: 'Opus Impact High-Yield Skills',
    fileName: 'opus-impact-skills.md',
    description: 'Marzano high-yield strategies, formative assessment rubrics, HOTS item formulation, and peer coaching frameworks.',
    category: 'Pedagogy & Cognitive',
    location: '/src/skills/master_creator_skills/opus-impact-skills.md',
    isActive: true,
    version: '2.1',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'workspace-integration',
    name: 'Google Workspace 1P Integration',
    fileName: 'workspace-integration.md',
    description: 'Google Drive, Sheets, Docs, Calendar, and Gmail OAuth synchronizer for automated DepEd SF report filing.',
    category: 'System & Integration',
    location: '/src/skills/master_creator_skills/workspace-integration.md',
    isActive: true,
    version: '3.0',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'pwa-integration',
    name: 'PWA Offline & Local Storage Vault',
    fileName: 'pwa-integration.md',
    description: 'Service worker offline caching, Web App Manifest, and IndexedDB local vault for zero-internet SF report generation.',
    category: 'System & Integration',
    location: '/src/skills/master_creator_skills/pwa-integration.md',
    isActive: true,
    version: '1.5',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'applet-seo',
    name: 'Applet SEO & Schema Structured Data',
    fileName: 'applet-seo.md',
    description: 'OpenGraph card meta, Schema.org JSON-LD data structures, and search engine indexing for educational portals.',
    category: 'Design & Branding',
    location: '/src/skills/master_creator_skills/applet-seo.md',
    isActive: true,
    version: '1.2',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'google-maps-integration',
    name: 'Google Maps GIS School Geofence',
    fileName: 'google-maps-integration.md',
    description: 'Spatial mapping of LNNCHS campus, Baroy district geofencing, and regional division boundary overlays.',
    category: 'System & Integration',
    location: '/src/skills/master_creator_skills/google-maps-integration.md',
    isActive: true,
    version: '2.0',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'firebase-integration',
    name: 'Firebase Firestore & Auth Vault Sync',
    fileName: 'firebase-integration.md',
    description: 'Persistent cloud data synchronization for 120 sections, Role-Based Access Control (RBAC), and telemetry streams.',
    category: 'System & Integration',
    location: '/src/skills/master_creator_skills/firebase-integration.md',
    isActive: true,
    version: '2.5',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  },
  {
    id: 'gemini-api',
    name: 'Gemini AI Intelligence Engine',
    fileName: 'gemini-api.md',
    description: 'Fast streaming responses via @google/genai TypeScript SDK, multimodal scanning, and 20-Attribute Standard Curriculum alignment.',
    category: 'AI & Content Generation',
    location: '/src/skills/master_creator_skills/gemini-api.md',
    isActive: true,
    version: '3.1',
    updatedDate: '2026-09-24',
    author: 'Steaven Kinth D. Boiser'
  }
];
