export interface GuestProfile {
  id: string;
  name: string;
  allowedPlusOnes: number;
  invitedEventIds: string[]; // IDs of events from weddingConfig.ts
  familyGroup?: string;
  note?: string;
}

/**
 * SAMPLE MOCK DATABASE
 * When you are ready with your real database (e.g., Google Sheets, Supabase, Airtable, or SQL),
 * you can replace or connect this lookup function directly!
 */
export const mockGuestsDatabase: GuestProfile[] = [
  {
    id: "g-1",
    name: "Amit Kumar",
    allowedPlusOnes: 2,
    invitedEventIds: ["haldi", "sangeet", "wedding", "reception"],
    familyGroup: "Close Family",
    note: "We can't wait to dance with you at all the ceremonies!"
  },
  {
    id: "g-2",
    name: "Priya Sharma",
    allowedPlusOnes: 1,
    invitedEventIds: ["sangeet", "wedding", "reception"],
    familyGroup: "Friends & Colleagues",
    note: "Get ready for a night of music, sangeet, and the wedding celebration!"
  },
  {
    id: "g-3",
    name: "Rohan Verma",
    allowedPlusOnes: 1,
    invitedEventIds: ["wedding", "reception"],
    familyGroup: "University Friends",
    note: "Looking forward to celebrating our wedding ceremony & reception with you!"
  },
  {
    id: "g-4",
    name: "Uncle Rajesh & Family",
    allowedPlusOnes: 3,
    invitedEventIds: ["haldi", "sangeet", "wedding", "reception"],
    familyGroup: "Sharma Family",
    note: "Seeking your heartfelt blessings for all the sacred rituals."
  },
  {
    id: "g-5",
    name: "Ananya Patel",
    allowedPlusOnes: 1,
    invitedEventIds: ["wedding", "reception"],
    familyGroup: "Close Friends",
    note: "Honored to have you witness our wedding vows and reception."
  }
];

/**
 * Searches the guest database by name (case-insensitive & whitespace trimmed).
 * Checks exact match, full name, or first/last name substring.
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // 1. Check exact match
  const exact = mockGuestsDatabase.find(
    (g) => g.name.toLowerCase() === clean
  );
  if (exact) return exact;

  // 2. Check contains match
  const contains = mockGuestsDatabase.find((g) =>
    g.name.toLowerCase().includes(clean) || clean.includes(g.name.toLowerCase())
  );
  if (contains) return contains;

  // 3. Check individual word matches (e.g. searching "Amit" or "Verma")
  const words = clean.split(/\s+/);
  const wordMatch = mockGuestsDatabase.find((g) => {
    const guestWords = g.name.toLowerCase().split(/\s+/);
    return words.some((w) => w.length > 2 && guestWords.includes(w));
  });
  if (wordMatch) return wordMatch;

  return null;
}
