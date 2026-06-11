/** Supabase projects linked to this workspace (via MCP). */
export const SUPABASE_PROJECTS = {
  /** Primary — Zenith Solar / v0-PT-Throne lead capture */
  phBolt: {
    id: "tjosqmcutstuuaojedeg",
    name: "ph-Bolt",
    region: "eu-west-1",
    url: "https://tjosqmcutstuuaojedeg.supabase.co",
  },
  /** Separate app — Barcelona session booking */
  barcelonaSessionBook: {
    id: "lfyklgmquleidlhjapbu",
    name: "barcelona-session-book",
    region: "eu-west-1",
    url: "https://lfyklgmquleidlhjapbu.supabase.co",
  },
} as const

export const PRIMARY_SUPABASE_PROJECT = SUPABASE_PROJECTS.phBolt
