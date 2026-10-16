export interface WeddingEvent {
  id: string; // 'haldi' | 'sangeet' | 'wedding' | 'reception'
  name: string;
  subtitle: string;
  date: string;
  time: string;
  muhuratNote?: string;
  venueName: string;
  hallName: string;
  address: string;
  dressCode: string;
  dressCodeColorHex: string;
  dressCodeSuggestion: string;
  description: string;
  iconName: 'sun' | 'sparkles' | 'flame' | 'music';
  googleMapsUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
      bio?: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
      bio?: string;
    };
    hashtag: string;
  };
  invitationNote: string;
  auspiciousInvocation: {
    title: string;
    subtitle: string;
    meaning: string;
  };
  weddingDate: string; // ISO date for countdown
  displayDateText: string;
  venueOverview: {
    name: string;
    fullAddress: string;
    googleMapsDirectionsUrl: string;
    accommodationsNote: string;
  };
  events: WeddingEvent[];
  rsvp: {
    deadline: string;
    contactPhone: string; // WhatsApp phone number with country code (e.g. 1234567890)
    contactName: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Shreyas",
      fullName: "Shreyas",
      parents: "Beloved son of our esteemed parents & elders",
      bio: "Excited to celebrate this new chapter with all our loved ones."
    },
    bride: {
      firstName: "Neevedita",
      fullName: "Neevedita",
      parents: "Beloved daughter of our esteemed parents & elders",
      bio: "Looking forward to welcoming you to our wedding celebrations."
    },
    hashtag: "#ShreyasAndNeevedita"
  },

  invitationNote: "Together with our families, we joyfully welcome you to celebrate our wedding. Please enter your name below to view your personalized ceremony schedule and RSVP.",

  auspiciousInvocation: {
    title: "Om Shri Ganeshaya Namaha",
    subtitle: "With the divine blessings of our elders and almighty",
    meaning: "Invoking peace, prosperity, and joyous beginnings as two families unite."
  },

  // Target date for countdown (customize as needed)
  weddingDate: "2026-11-20T10:30:00",
  displayDateText: "November 20, 2026",

  venueOverview: {
    name: "The Grand Heritage Palace & Lawns",
    fullAddress: "Heritage Estate Grounds, Main Ballroom & Central Lawns",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
    accommodationsNote: "Valet parking and hospitality desks are arranged at the entrance. Dedicated guest assistance will be available throughout all ceremonies."
  },

  events: [
    {
      id: "haldi",
      name: "Haldi & Cleansing Ritual",
      subtitle: "Auspicious Turmeric & Flower Showers",
      date: "Thursday, November 19, 2026",
      time: "10:30 AM – 1:00 PM",
      muhuratNote: "Ceremony begins at 10:45 AM",
      venueName: "The Grand Heritage Palace",
      hallName: "Sunlit Courtyard & Fountain Lawns",
      address: "Courtyard Wing, Heritage Estate",
      dressCode: "Sunshine Yellow, Mustard, or Festive Ochre",
      dressCodeColorHex: "#F59E0B",
      dressCodeSuggestion: "Breezy kurtas, light dresses, or traditional attire ready for turmeric & flower showers.",
      description: "A joyful traditional morning of blessings, fresh turmeric paste, fragrant rose water, and shower of marigold petals.",
      iconName: "sun",
      googleMapsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
      calendarEvent: {
        title: "Shreyas & Neevedita — Haldi Ceremony",
        description: "Join us for morning prayers and the joyful Haldi ceremony.",
        location: "Sunlit Courtyard, The Grand Heritage Palace",
        startDate: "20261119T103000Z",
        endDate: "20261119T130000Z"
      }
    },
    {
      id: "sangeet",
      name: "Mehendi, Sangeet & Musical Night",
      subtitle: "Henna, Music, Dance & Celebrations",
      date: "Thursday, November 19, 2026",
      time: "6:00 PM onwards",
      muhuratNote: "Performances begin at 7:30 PM",
      venueName: "The Grand Heritage Palace",
      hallName: "The Lotus Amphitheatre & Gardens",
      address: "Garden Pavilion, Heritage Estate",
      dressCode: "Festive Pastels, Emerald Greens, or Indo-Western Shimmer",
      dressCodeColorHex: "#059669",
      dressCodeSuggestion: "Festive lehengas, kurtas, or cocktail evening wear for dancing and music.",
      description: "An evening of intricate henna art, high-energy family dance performances, live music, and celebratory dinner under fairy lights.",
      iconName: "music",
      googleMapsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
      calendarEvent: {
        title: "Shreyas & Neevedita — Sangeet & Mehendi Celebration",
        description: "An enchanting evening of henna, music, dance performances, and dinner.",
        location: "The Lotus Amphitheatre, The Grand Heritage Palace",
        startDate: "20261119T180000Z",
        endDate: "20261119T233000Z"
      }
    },
    {
      id: "wedding",
      name: "Baraat, Varmala & Sacred Pheras",
      subtitle: "The Vedic Wedding Ceremony & Seven Steps",
      date: "Friday, November 20, 2026",
      time: "10:00 AM (Baraat) • 11:30 AM (Pheras)",
      muhuratNote: "Auspicious Vivah Muhurat: 11:45 AM",
      venueName: "The Grand Heritage Palace",
      hallName: "The Royal Mandap Pavilion",
      address: "Central Royal Lawns, Heritage Estate",
      dressCode: "Royal Traditional Indian Attire (Gold, Cream, Silk, or Pastels)",
      dressCodeColorHex: "#B45309",
      dressCodeSuggestion: "Sherwanis, Bandhgalas, Kurtas, Banarasi/Kanjivaram Sarees, or Royal Lehengas.",
      description: "The groom's lively procession (Baraat) followed by the garland exchange (Varmala) and solemn Vedic wedding rituals around the sacred fire (Pheras).",
      iconName: "flame",
      googleMapsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
      calendarEvent: {
        title: "Shreyas & Neevedita — Sacred Wedding Ceremony",
        description: "The auspicious Hindu wedding ceremony, Baraat arrival, and sacred vows around the holy fire.",
        location: "The Royal Mandap Pavilion, The Grand Heritage Palace",
        startDate: "20261120T100000Z",
        endDate: "20261120T143000Z"
      }
    },
    {
      id: "reception",
      name: "The Wedding Reception & Banquet",
      subtitle: "Dinner, Toasts & Celebrations",
      date: "Friday, November 20, 2026",
      time: "7:00 PM onwards",
      venueName: "The Grand Heritage Palace",
      hallName: "The Grand Crystal Ballroom & Terrace",
      address: "Main Palace Wing, Heritage Estate",
      dressCode: "Evening Formal / Black Tie / Indo-Western Glamour",
      dressCodeColorHex: "#7C3AED",
      dressCodeSuggestion: "Evening gowns, formal suits, tuxedos, or embellished celebratory wear.",
      description: "An elegant evening celebrating the newly married couple with heartfelt toasts, royal dinner banquet, and music.",
      iconName: "sparkles",
      googleMapsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
      calendarEvent: {
        title: "Shreyas & Neevedita — Wedding Reception & Banquet",
        description: "Celebrate the newlyweds with dinner, toasts, and dancing.",
        location: "The Grand Crystal Ballroom, The Grand Heritage Palace",
        startDate: "20261120T190000Z",
        endDate: "20261120T233000Z"
      }
    }
  ],

  rsvp: {
    deadline: "October 25, 2026",
    contactPhone: "1234567890", // User can replace with their actual WhatsApp number
    contactName: "Wedding Hospitality Desk"
  }
};
