export interface GuestProfile {
  id: string;
  name: string;
  allowedPlusOnes: number;
  invitedEventIds: string[]; // IDs: 'mehendi' | 'garba' | 'vidhi' | 'lagna' | 'reception'
  familyGroup?: string;
  note?: string;
}

/**
 * GUEST DATABASE
 * Currently testing with Ishaan Goswami only
 */
export const mockGuestsDatabase: GuestProfile[] = [
  {
    id: "guest-ishaan-goswami",
    name: "Ishaan Goswami",
    allowedPlusOnes: 0,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyGroup: "Family",
    note: "We are thrilled and honored to have you celebrate all ceremonies with us in Atlanta, Georgia!"
  }
];

/**
 * Lookup for Guest Name
 * Strictly matches "Ishaan Goswami" (or "Ishaan") only for current testing
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!clean) return null;

  // Strictly match "ishaan goswami" only
  if (clean === "ishaan goswami") {
    return mockGuestsDatabase[0];
  }

  // All other names (e.g. Jigna Goswami, Patel, etc.) return null
  return null;
}
