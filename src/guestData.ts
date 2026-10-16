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
 * Smart Lookup for Guest Name
 * Matches "Ishaan Goswami", "Ishaan", or "Goswami" (case-insensitive)
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 3) return null;

  const tokens = clean.split(/\s+/).filter(Boolean);
  const ishaan = mockGuestsDatabase[0];
  const ishaanLower = ishaan.name.toLowerCase();

  // Match full name, first name "ishaan", or last name "goswami"
  if (
    clean === ishaanLower ||
    clean === "ishaan" ||
    clean === "goswami" ||
    tokens.includes("ishaan") ||
    tokens.includes("goswami")
  ) {
    return ishaan;
  }

  // Generic lookup for future guests
  return (
    mockGuestsDatabase.find((g) => {
      const gName = g.name.toLowerCase();
      const gTokens = gName.split(/\s+/);
      return (
        clean === gName ||
        tokens.some((t) => gTokens.includes(t) && t.length >= 3)
      );
    }) || null
  );
}
