export interface GuestProfile {
  id: string;
  name: string;
  relationship?: string; // e.g. "Father", "Mother", "Sister", "Son / Self"
  allowedPlusOnes: number;
  invitedEventIds: string[]; // IDs: 'mehendi' | 'garba' | 'vidhi' | 'lagna' | 'reception'
  familyId?: string; // Grouping identifier so unrelated families with same last name aren't mixed
  familyGroupName?: string; // Display name for the family unit
  note?: string;
}

/**
 * GUEST DATABASE
 * Testing family group: Ishaan Goswami, Yogesh Goswami, Jigna Goswami, Keya Goswami
 * All invited to all 5 wedding ceremonies
 */
export const mockGuestsDatabase: GuestProfile[] = [
  {
    id: "guest-ishaan-goswami",
    name: "Ishaan Goswami",
    relationship: "Self",
    allowedPlusOnes: 0,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyId: "goswami-immediate",
    familyGroupName: "The Goswami Family",
    note: "We are thrilled and honored to celebrate all wedding ceremonies with you and your family in Atlanta, Georgia!"
  },
  {
    id: "guest-yogesh-goswami",
    name: "Yogesh Goswami",
    relationship: "Father",
    allowedPlusOnes: 0,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyId: "goswami-immediate",
    familyGroupName: "The Goswami Family",
    note: "We are thrilled and honored to celebrate all wedding ceremonies with you and your family in Atlanta, Georgia!"
  },
  {
    id: "guest-jigna-goswami",
    name: "Jigna Goswami",
    relationship: "Mother",
    allowedPlusOnes: 0,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyId: "goswami-immediate",
    familyGroupName: "The Goswami Family",
    note: "We are thrilled and honored to celebrate all wedding ceremonies with you and your family in Atlanta, Georgia!"
  },
  {
    id: "guest-keya-goswami",
    name: "Keya Goswami",
    relationship: "Sister",
    allowedPlusOnes: 0,
    invitedEventIds: ["mehendi", "garba", "vidhi", "lagna", "reception"],
    familyId: "goswami-immediate",
    familyGroupName: "The Goswami Family",
    note: "We are thrilled and honored to celebrate all wedding ceremonies with you and your family in Atlanta, Georgia!"
  }
];

/**
 * Helper to fetch all members belonging to a family group
 */
export function getFamilyMembers(familyId?: string): GuestProfile[] {
  if (!familyId) return [];
  return mockGuestsDatabase.filter((g) => g.familyId === familyId);
}

/**
 * Lookup Guest Name
 * Matches full name (e.g. "Yogesh Goswami", "Jigna Goswami", "Keya Goswami", "Ishaan Goswami")
 * or distinct first name (e.g. "Yogesh", "Jigna", "Keya", "Ishaan").
 * Does NOT match generic last name "Goswami" alone to prevent ambiguous family lookup.
 */
export function lookupGuest(query: string): GuestProfile | null {
  const clean = query.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!clean) return null;

  // 1. Exact match on full name
  const exactMatch = mockGuestsDatabase.find(
    (g) => g.name.toLowerCase() === clean
  );
  if (exactMatch) return exactMatch;

  // 2. Exact match on first name
  const firstNameMatch = mockGuestsDatabase.find(
    (g) => g.name.split(' ')[0].toLowerCase() === clean
  );
  if (firstNameMatch) return firstNameMatch;

  // No match
  return null;
}
