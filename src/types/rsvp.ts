export interface GuestRsvpRecord {
  id: string;
  guestName: string;
  guestCount: number;
  eventResponses: Record<string, 'yes' | 'no'>; // e.g. { mehendi: 'yes', garba: 'yes', vidhi: 'yes', lagna: 'yes', reception: 'yes' }
  dietaryPreference?: string;
  blessingMessage?: string;
  submittedAt: string;
}

export const RSVP_STORAGE_KEY = 'shreyas_neevedita_wedding_rsvps';
