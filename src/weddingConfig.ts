export interface WeddingEvent {
  id: string;
  name: string;
  sanskritSubtitle?: string;
  date: string;
  time: string;
  muhuratNote?: string;
  venueName: string;
  address: string;
  city: string;
  dressCode: string;
  dressCodeColorHex: string;
  dressCodeSuggestion: string;
  description: string;
  iconName: 'sun' | 'sparkles' | 'flame' | 'music' | 'heart';
  googleMapsUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO format or YYYYMMDDTHHmmssZ
    endDate: string;
  };
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
      grandparents?: string;
      hometown: string;
      bio?: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
      grandparents?: string;
      hometown: string;
      bio?: string;
    };
    hashtag: string;
  };
  invitationNote: string;
  auspiciousMantra: {
    sanskrit: string;
    transliteration: string;
    englishMeaning: string;
  };
  weddingDate: string; // e.g., '2027-02-14T10:00:00'
  displayDateText: string;
  venueOverview: {
    name: string;
    cityState: string;
    fullAddress: string;
    googleMapsEmbedUrl?: string;
    googleMapsDirectionsUrl: string;
    airportsNearby: string[];
    accommodationsNote: string;
  };
  events: WeddingEvent[];
  saptapadi: {
    step: number;
    sanskrit: string;
    vowTitle: string;
    meaning: string;
  }[];
  rsvp: {
    deadline: string;
    contactPhone: string; // WhatsApp number with country code, e.g. "1234567890"
    contactName: string;
    allowDietaryPreferences: boolean;
  };
  ourStory: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    milestones: {
      year: string;
      title: string;
      description: string;
    }[];
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Aarav",
      fullName: "Aarav Sharma",
      parents: "Smt. Sunita & Shri Rajesh Sharma",
      grandparents: "Grandson of Late Smt. Kamala & Shri Om Prakash Sharma",
      hometown: "New Delhi, India",
      bio: "An architect who loves heritage monuments, classical ragas, and slow morning chai."
    },
    bride: {
      firstName: "Diya",
      fullName: "Diya Patel",
      parents: "Smt. Meera & Shri Vikram Patel",
      grandparents: "Granddaughter of Smt. Sarla & Late Shri Kantilal Patel",
      hometown: "Ahmedabad, India",
      bio: "A botanical artist with a love for traditional Pichwai art, classical dance, and poetry."
    },
    hashtag: "#AaravFoundHisDiya"
  },
  
  invitationNote: "Together with their beloved families, Aarav & Diya cordially request the honor of your gracious presence and blessings as they tie the sacred knot and embark on their lifelong journey together.",

  auspiciousMantra: {
    sanskrit: "|| ॐ श्री गणेशाय नमः ||",
    transliteration: "Om Shri Ganeshaya Namaha",
    englishMeaning: "Salutations to Lord Ganesha, the remover of all obstacles and harbinger of auspicious beginnings."
  },

  // Target date for countdown (Set your future wedding date here)
  weddingDate: "2027-02-18T10:30:00",
  displayDateText: "February 18, 2027 • Jaipur, Rajasthan",

  venueOverview: {
    name: "The Royal Vilas Palace & Gardens",
    cityState: "Jaipur, Rajasthan",
    fullAddress: "Palace Road, Near Heritage Hills, Jaipur, Rajasthan 302001",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=The+Rajmahal+Palace+Jaipur",
    airportsNearby: [
      "Jaipur International Airport (JAI) — 25 mins drive",
      "New Delhi IGI Airport (DEL) — 4.5 hours drive / 45 min flight"
    ],
    accommodationsNote: "Complimentary royal suites and deluxe cottages have been reserved for all our guests at the palace heritage wing. Valet parking and airport shuttles will be provided."
  },

  events: [
    {
      id: "ganesh-puja-haldi",
      name: "Ganesh Sthapana & Haldi",
      sanskritSubtitle: "मांगल्यम् & हरिद्रा लेपनम्",
      date: "Tuesday, February 16, 2027",
      time: "10:00 AM – 1:30 PM",
      muhuratNote: "Auspicious Puja Muhurat: 10:15 AM",
      venueName: "The Courtyard of Sunflowers",
      address: "Heritage Lawn, Royal Vilas",
      city: "Jaipur",
      dressCode: "Sunshine Yellow, Ochre, or Festive Mustard",
      dressCodeColorHex: "#F59E0B",
      dressCodeSuggestion: "Breezy kurtas, dhoti, light lehengas (ready to get splashed with fragrant turmeric & flower petals!)",
      description: "We invoke Lord Ganesha's blessings for auspicious beginnings, followed by the joyful Haldi ceremony with fresh turmeric, rose water, and marigold flower showers.",
      iconName: "sun",
      googleMapsUrl: "https://maps.google.com/?q=Jaipur",
      calendarEvent: {
        title: "Aarav & Diya — Ganesh Puja & Haldi Ceremony",
        description: "Join us for auspicious prayers and joyous Haldi ceremony with flower showers.",
        location: "The Courtyard of Sunflowers, Royal Vilas, Jaipur",
        startDate: "20270216T100000Z",
        endDate: "20270216T133000Z"
      }
    },
    {
      id: "mehendi-sangeet",
      name: "Mehendi, Sangeet & Dhol Night",
      sanskritSubtitle: "मेहंदी & संगीत उत्सव",
      date: "Wednesday, February 17, 2027",
      time: "5:30 PM onwards",
      venueName: "The Lotus Lake Amphitheatre",
      address: "Lake View Pavilion, Royal Vilas",
      city: "Jaipur",
      dressCode: "Pastel Florals, Emerald Greens, or Shimmering Indo-Western",
      dressCodeColorHex: "#059669",
      dressCodeSuggestion: "Comfortable festive wear for an energetic night of family dance performances, live music, and soulful sitar-percussion.",
      description: "Delicate henna application, live Rajasthani folk music, synchronized family dances, dhol beats, and artisanal street chaat stalls under twinkling fairy lights.",
      iconName: "music",
      googleMapsUrl: "https://maps.google.com/?q=Jaipur",
      calendarEvent: {
        title: "Aarav & Diya — Mehendi & Sangeet Celebration",
        description: "A magical evening of henna, music, dance performances, and dinner.",
        location: "The Lotus Lake Amphitheatre, Royal Vilas, Jaipur",
        startDate: "20270217T173000Z",
        endDate: "20270217T230000Z"
      }
    },
    {
      id: "baraat-vivah",
      name: "Baraat, Varmala & Sacred Pheras",
      sanskritSubtitle: "विवाह संस्कार & सप्तपदी",
      date: "Thursday, February 18, 2027",
      time: "9:30 AM (Baraat) • 11:15 AM (Pheras)",
      muhuratNote: "Shubh Vivah Muhurat: 11:21 AM",
      venueName: "The Mandap of Eternal Pillars",
      address: "Main Palace Lawns, Royal Vilas",
      city: "Jaipur",
      dressCode: "Royal Traditional Indian Attire (Pastels, Ivory, Gold, or Silk)",
      dressCodeColorHex: "#B45309",
      dressCodeSuggestion: "Sherwanis, Bandhgalas, Kurtas with Nehru jackets, Kanjivaram or Banarasi Sarees, and Royal Lehengas.",
      description: "The groom's lively procession (Baraat) leads into the garland exchange (Varmala) and the sacred Vedic wedding rituals around the Agni (holy fire), concluding with the Seven Steps (Saptapadi).",
      iconName: "flame",
      googleMapsUrl: "https://maps.google.com/?q=Jaipur",
      calendarEvent: {
        title: "Aarav & Diya — Shubh Vivah & Vedic Pheras",
        description: "The auspicious Hindu wedding ceremony, Baraat arrival, and sacred vows around the Agni.",
        location: "The Mandap of Eternal Pillars, Royal Vilas, Jaipur",
        startDate: "20270218T093000Z",
        endDate: "20270218T140000Z"
      }
    },
    {
      id: "reception",
      name: "The Royal Dinner & Reception",
      sanskritSubtitle: "प्रीतिभोज & शुभाशीर्वाद",
      date: "Thursday, February 18, 2027",
      time: "7:30 PM onwards",
      venueName: "The Grand Darbar Hall & Terrace",
      address: "Palace Wing, Royal Vilas",
      city: "Jaipur",
      dressCode: "Indo-Western Glamour / Formal / Black Tie Silk",
      dressCodeColorHex: "#7C3AED",
      dressCodeSuggestion: "Evening gowns, formal tuxedos, stylish bandhgalas, or embellished sarees.",
      description: "An enchanting evening of heartfelt toasts, live acoustic music, exquisite royal banquet dinner, and celebrating the newly wedded couple under a canopy of stars.",
      iconName: "sparkles",
      googleMapsUrl: "https://maps.google.com/?q=Jaipur",
      calendarEvent: {
        title: "Aarav & Diya — Royal Reception & Banquet",
        description: "Celebrate the newly weds with cocktails, royal dinner, and dancing.",
        location: "The Grand Darbar Hall, Royal Vilas, Jaipur",
        startDate: "20270218T193000Z",
        endDate: "20270218T233000Z"
      }
    }
  ],

  saptapadi: [
    {
      step: 1,
      sanskrit: "इष एकपदे भव",
      vowTitle: "Nourishment & Health",
      meaning: "May we nurture each other, sharing responsibility for healthy nourishment, wellness, and peace in our home."
    },
    {
      step: 2,
      sanskrit: "ऊर्जे द्विपदे भव",
      vowTitle: "Strength & Resilience",
      meaning: "May we grow together in physical, mental, and spiritual strength, supporting each other through every season of life."
    },
    {
      step: 3,
      sanskrit: "रायस्पोषाय त्रिपदे भव",
      vowTitle: "Prosperity & Right Livelihood",
      meaning: "May we achieve prosperity through noble effort, sharing our abundance with family and society with grace."
    },
    {
      step: 4,
      sanskrit: "मायोभव्याय चतुष्पदे भव",
      vowTitle: "Mutual Happiness & Trust",
      meaning: "May our hearts be filled with mutual respect, unfailing harmony, laughter, and lifelong companionship."
    },
    {
      step: 5,
      sanskrit: "प्रजाभ्यः पञ्चपदे भव",
      vowTitle: "Family & Future Generations",
      meaning: "May we be blessed with virtuous children, honoring our elders and cultivating values of love and kindness."
    },
    {
      step: 6,
      sanskrit: "ऋतुभ्यः षट्पदे भव",
      vowTitle: "Harmony with All Seasons",
      meaning: "May we remain faithful and aligned through all cycles of life, cherishing our companionship through joy and sorrow."
    },
    {
      step: 7,
      sanskrit: "सखे सप्तपदे भव",
      vowTitle: "Eternal Friendship & Love",
      meaning: "Having walked seven steps together, we become lifelong friends, united in heart, mind, and spirit forever."
    }
  ],

  rsvp: {
    deadline: "January 15, 2027",
    contactPhone: "919876543210", // User can replace with their actual WhatsApp number
    contactName: "Sharma & Patel Family RSVP Desk",
    allowDietaryPreferences: true
  },

  ourStory: {
    title: "How It All Began",
    subtitle: "Two souls, ancient heritage, and a modern serendipity",
    paragraphs: [
      "Our paths first crossed in the quiet library corridor of an architectural conservation workshop in Old Delhi. What began as an animated debate over stone carving traditions turned into endless walks through Lodhi Gardens, discussing dreams, philosophy, and our shared love for heritage.",
      "Over four years of shared laughter, travel across ancient temple towns, and countless pots of ginger tea, we realized that our differences made us whole, and our values bound us together.",
      "With the loving blessings of our parents, grandparents, and ancestors, we invite you to stand with us as we step around the sacred Agni and begin our journey as one."
    ],
    milestones: [
      {
        year: "November 2022",
        title: "First Encounter",
        description: "Met amidst blueprints of ancient monuments in Delhi and talked for four hours without noticing the sun setting."
      },
      {
        year: "October 2024",
        title: "The Golden Sunset",
        description: "A trip to the Ghats of Varanasi under the evening Ganga Aarti, where we knew we wanted to share every prayer and sunrise together."
      },
      {
        year: "December 2025",
        title: "The Roka Ceremony",
        description: "Our families united with sweets, blessings, and joyful tears to formalize our union."
      },
      {
        year: "February 2027",
        title: "The Sacred Vows",
        description: "Celebrating our forever surrounded by the people who mean the world to us."
      }
    ]
  }
};
