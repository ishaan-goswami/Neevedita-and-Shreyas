export interface GuestProfile {
  id: string;
  name: string;
  allowedPlusOnes: number;
  invitedEventIds: string[]; // IDs: 'mehendi' | 'garba' | 'vidhi' | 'lagna' | 'reception'
  familyGroup?: string;
  note?: string;
}

/**
 * SAMPLE MOCK GUEST DATABASE
 * Primary Test Name: "Goswami" (Invited to all 5 events)
 */
export const mockGuestsDatabase: GuestProfile[] = [
  {
    id: "guest-goswami",
    name: "Goswami",
    allowedPlusOnes: 3,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyGroup: "Honored Guests & Family",
    note: "We are thrilled and honored to have you celebrate all ceremonies with us in Atlanta, Georgia!"
  },
  {
    id: "guest-patel",
    name: "Patel Family",
    allowedPlusOnes: 2,
    invitedEventIds: ["garba", "lagna", "reception"],
    familyGroup: "Close Family Friends",
    note: "Looking forward to celebrating Garba, the wedding Lagna, and Reception with you!"
  },
  {
    id: "guest-sharma",
    name: "Sharma",
    allowedPlusOnes: 1,
    invitedEventIds: ["lagna", "reception"],
    familyGroup: "University Friends",
    note: "Honored to have you witness our wedding Lagna and celebrate at the Reception."
  }
];

/**
 * Smart Lookup for Guest Name
 * Matches exact name, full name, or family word match (e.g. "Goswami", "Ishaan Goswami", "The Goswami Family")
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase();
  // Require at least 3 characters to search
  if (!clean || clean.length < 3) return null;

  // 1. Exact match (case-insensitive)
  const exact = mockGuestsDatabase.find(
    (g) => g.name.toLowerCase() === clean
  );
  if (exact) return exact;

  // 2. Special match for Goswami variations (only if contains the full word "goswami")
  if (clean.includes("goswami")) {
    return mockGuestsDatabase[0];
  }

  // 3. Whole word / token match (e.g. searching "Ishaan Goswami" matches "Goswami")
  const queryWords = clean.split(/\s+/).filter((w) => w.length >= 3);
  for (const guest of mockGuestsDatabase) {
    const guestWords = guest.name.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
    const hasCommonWord = queryWords.some((qw) => guestWords.includes(qw));
    if (hasCommonWord) return guest;
  }

  return null;
}
