export interface GuestRsvpRecord {
  id: string;
  guestName: string; // Primary guest who submitted/responded
  familyId?: string; // Grouping key (e.g. 'goswami-immediate')
  familyGroupName?: string; // Display name for the family unit
  familyMembers?: string[]; // Names of all members in the family
  guestCount: number; // Total headcount for this party
  eventResponses: Record<string, 'yes' | 'no'>; // High-level response per event
  memberResponses?: Record<string, Record<string, 'yes' | 'no'>>; // Member-specific responses: { [memberId]: { [eventId]: 'yes' | 'no' } }
  eventAttendees?: Record<string, string[]>; // Names of attending members per event
  eventDeclines?: Record<string, string[]>; // Names of declining members per event
  dietaryPreference?: string;
  blessingMessage?: string;
  submittedAt: string;
}

export const RSVP_STORAGE_KEY = 'neevedita_shreyas_wedding_rsvps';
