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
 * Matches exact, substring, or family name (e.g. "Goswami", "Ishaan Goswami", "The Goswamis")
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Special match for Goswami variations
  if (clean.includes("goswami")) {
    return mockGuestsDatabase[0];
  }

  // 1. Exact match
  const exact = mockGuestsDatabase.find(
    (g) => g.name.toLowerCase() === clean
  );
  if (exact) return exact;

  // 2. Substring match
  const contains = mockGuestsDatabase.find((g) =>
    g.name.toLowerCase().includes(clean) || clean.includes(g.name.toLowerCase())
  );
  if (contains) return contains;

  // 3. Word match (first or last name)
  const words = clean.split(/\s+/);
  const wordMatch = mockGuestsDatabase.find((g) => {
    const guestWords = g.name.toLowerCase().split(/\s+/);
    return words.some((w) => w.length > 2 && guestWords.includes(w));
  });
  if (wordMatch) return wordMatch;

  return null;
}
