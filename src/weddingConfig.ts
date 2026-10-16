export interface WeddingEvent {
  id: string; // 'mehendi' | 'garba' | 'vidhi' | 'lagna' | 'reception'
  name: string;
  subtitle: string;
  date: string;
  time: string;
  muhuratNote?: string;
  venueName: string;
  hallName: string;
  cityState: string;
  address: string;
  dressCode: string;
  dressCodeColorHex: string;
  dressCodeSuggestion: string;
  description: string;
  iconName: 'sun' | 'sparkles' | 'flame' | 'music' | 'flower';
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
  weddingDate: string; // ISO date for countdown
  displayDateText: string;
  locationCity: string;
  venuesList: {
    role: string;
    name: string;
    address: string;
    googleMapsUrl: string;
    note?: string;
  }[];
  venueOverview: {
    name: string;
    cityState: string;
    fullAddress: string;
    googleMapsDirectionsUrl: string;
    accommodationsNote: string;
  };
  events: WeddingEvent[];
  rsvp: {
    deadline: string;
    contactPhone: string; // WhatsApp phone number with country code
    contactName: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Shreyas",
      fullName: "Shreyas",
      parents: "Beloved son of our esteemed parents & elders",
      bio: "Excited to celebrate this blessed milestone with our dearest family and friends."
    },
    bride: {
      firstName: "Neevedita",
      fullName: "Neevedita",
      parents: "Beloved daughter of our esteemed parents & elders",
      bio: "Looking forward to welcoming you to our wedding celebrations in Atlanta."
    },
    hashtag: "#ShreyasAndNeevedita"
  },

  invitationNote: "Together with our families, we joyfully welcome you to our wedding celebrations in Atlanta, Georgia. Please enter your name below to view your personal ceremony schedule and RSVP.",

  // Target date for countdown (May 28, 2027)
  weddingDate: "2027-05-28T13:00:00",
  displayDateText: "May 28 – 30, 2027",
  locationCity: "Atlanta, Georgia",

  venuesList: [
    {
      role: "Garba Night",
      name: "Shiv Mandir of Atlanta",
      address: "890 Peachtree Industrial Blvd NE, Sugar Hill, GA 30518",
      googleMapsUrl: "https://maps.google.com/?q=Shiv+Mandir+of+Atlanta,+890+Peachtree+Industrial+Blvd+NE,+Sugar+Hill,+GA+30518",
      note: "Friday evening celebration of traditional Raas-Garba & dinner."
    },
    {
      role: "Vidhi & Mehendi",
      name: "Goswami Residence",
      address: "8205 St. Marlo Fairway Drive, Duluth, GA 30097",
      googleMapsUrl: "https://maps.google.com/?q=8205+St.+Marlo+Fairway+Drive,+Duluth,+GA+30097",
      note: "Sacred morning Vedic rituals, Pithi ceremony & afternoon mehendi."
    },
    {
      role: "Wedding (Lagna) & Reception",
      name: "Atlanta Evergreen Lakeside Resort",
      address: "4021 Lakeview Dr, Stone Mountain, GA 30083",
      googleMapsUrl: "https://maps.google.com/?q=Atlanta+Evergreen+Lakeside+Resort,+4021+Lakeview+Dr,+Stone+Mountain,+GA+30083",
      note: "Lakeside Baraat, sacred Vedic wedding ceremony & grand evening gala."
    }
  ],

  venueOverview: {
    name: "Atlanta Evergreen Lakeside Resort",
    cityState: "Stone Mountain, Georgia",
    fullAddress: "4021 Lakeview Dr, Stone Mountain, GA 30083",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Atlanta+Evergreen+Lakeside+Resort,+4021+Lakeview+Dr,+Stone+Mountain,+GA+30083",
    accommodationsNote: "Guest rooms and resort suites are available at the Atlanta Evergreen Lakeside Resort. Dedicated guest assistance and valet parking will be available at all event venues."
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      subtitle: "Intricate Henna & Afternoon Celebrations",
      date: "Friday, May 28, 2027",
      time: "1:00 PM – 4:30 PM",
      muhuratNote: "Henna stations open at 1:15 PM",
      venueName: "Goswami Residence",
      hallName: "Outdoor Garden Terrace & Lawns",
      cityState: "Duluth, GA",
      address: "8205 St. Marlo Fairway Drive, Duluth, GA 30097",
      dressCode: "Pastels, Festive Florals, or Light Traditional",
      dressCodeColorHex: "#059669",
      dressCodeSuggestion: "Breezy kurtas, light lehengas, or comfortable festive wear for henna application and socializing.",
      description: "An intimate, colorful gathering with delicate henna application, savory Indian street fare, fresh chai, and music as our wedding celebrations kick off.",
      iconName: "flower",
      googleMapsUrl: "https://maps.google.com/?q=8205+St.+Marlo+Fairway+Drive,+Duluth,+GA+30097",
      calendarEvent: {
        title: "Shreyas & Neevedita — Mehendi Celebration",
        description: "Join us for an afternoon of henna, music, and lunch.",
        location: "8205 St. Marlo Fairway Drive, Duluth, GA 30097",
        startDate: "20270528T130000Z",
        endDate: "20270528T163000Z"
      }
    },
    {
      id: "garba",
      name: "Garba",
      subtitle: "Traditional Raas-Garba & Dhol Night",
      date: "Friday, May 28, 2027",
      time: "6:30 PM onwards",
      muhuratNote: "Aarti at 7:00 PM • Raas-Garba follows",
      venueName: "Shiv Mandir of Atlanta",
      hallName: "Community Celebration Hall",
      cityState: "Sugar Hill, GA",
      address: "890 Peachtree Industrial Blvd NE, Sugar Hill, GA 30518",
      dressCode: "Vibrant Chaniya Cholis, Kediya, Kurtas, or Colorful Ethnic",
      dressCodeColorHex: "#D97706",
      dressCodeSuggestion: "Comfortable footwear ready for continuous Garba circles, spinning Dandiya Raas, and dhol beats!",
      description: "An electrifying evening of traditional Gujarati Garba, spinning Dandiya Raas with sticks, live energetic percussion, and an authentic dinner spread.",
      iconName: "music",
      googleMapsUrl: "https://maps.google.com/?q=Shiv+Mandir+of+Atlanta,+890+Peachtree+Industrial+Blvd+NE,+Sugar+Hill,+GA+30518",
      calendarEvent: {
        title: "Shreyas & Neevedita — Garba & Raas Night",
        description: "A high-energy night of Garba, Dandiya Raas, music, and dinner.",
        location: "Shiv Mandir of Atlanta, 890 Peachtree Industrial Blvd NE, Sugar Hill, GA 30518",
        startDate: "20270528T183000Z",
        endDate: "20270528T233000Z"
      }
    },
    {
      id: "vidhi",
      name: "Vidhi",
      subtitle: "Sacred Mandap Mahurat, Grah Shanti & Pithi",
      date: "Saturday, May 29, 2027",
      time: "9:30 AM – 1:30 PM",
      muhuratNote: "Puja begins promptly at 9:45 AM",
      venueName: "Goswami Residence",
      hallName: "The Sacred Mandap Pavilion",
      cityState: "Duluth, GA",
      address: "8205 St. Marlo Fairway Drive, Duluth, GA 30097",
      dressCode: "Sunshine Yellow, Ochre, Gold, or Traditional Cotton/Silk",
      dressCodeColorHex: "#EAB308",
      dressCodeSuggestion: "Traditional Indian attire for prayer ceremonies and getting ready for joyful haldi/pithi flower showers.",
      description: "Auspicious Vedic prayers including Mandap Mahurat, Grah Shanti to invoke planetary harmony, and the joyful Pithi ceremony blessed with turmeric and flower showers.",
      iconName: "sun",
      googleMapsUrl: "https://maps.google.com/?q=8205+St.+Marlo+Fairway+Drive,+Duluth,+GA+30097",
      calendarEvent: {
        title: "Shreyas & Neevedita — Vidhi (Mandap Mahurat & Pithi)",
        description: "Sacred morning Vedic rituals and Pithi ceremony followed by traditional lunch.",
        location: "8205 St. Marlo Fairway Drive, Duluth, GA 30097",
        startDate: "20270529T093000Z",
        endDate: "20270529T133000Z"
      }
    },
    {
      id: "lagna",
      name: "Lagna",
      subtitle: "The Sacred Vedic Wedding Ceremony & Pheras",
      date: "Sunday, May 30, 2027",
      time: "10:00 AM (Baraat) • 11:30 AM (Lagna Muhurat)",
      muhuratNote: "Auspicious Vivah Muhurat: 11:45 AM",
      venueName: "Atlanta Evergreen Lakeside Resort",
      hallName: "Lakeside Mandap Lawn & Ballroom",
      cityState: "Stone Mountain, GA",
      address: "4021 Lakeview Dr, Stone Mountain, GA 30083",
      dressCode: "Royal Traditional Indian Silk (Pastels, Ivory, Gold, or Silk Sarees)",
      dressCodeColorHex: "#B45309",
      dressCodeSuggestion: "Sherwanis, Bandhgalas, Kurtas with Jackets, Kanjivaram/Banarasi Sarees, or Royal Lehengas.",
      description: "The groom's joyful procession (Baraat) followed by the garland exchange (Jaimala) and sacred Vedic marriage rites around the Agni (Pheras & Saptapadi).",
      iconName: "flame",
      googleMapsUrl: "https://maps.google.com/?q=Atlanta+Evergreen+Lakeside+Resort,+4021+Lakeview+Dr,+Stone+Mountain,+GA+30083",
      calendarEvent: {
        title: "Shreyas & Neevedita — Shubh Lagna (Wedding Ceremony)",
        description: "The sacred Vedic wedding ceremony, Baraat, and vows around the holy fire.",
        location: "Atlanta Evergreen Lakeside Resort, 4021 Lakeview Dr, Stone Mountain, GA 30083",
        startDate: "20270530T100000Z",
        endDate: "20270530T143000Z"
      }
    },
    {
      id: "reception",
      name: "Reception",
      subtitle: "Grand Gala Dinner & Celebrations",
      date: "Sunday, May 30, 2027",
      time: "6:30 PM onwards",
      muhuratNote: "Newlyweds Entrance at 7:30 PM",
      venueName: "Atlanta Evergreen Lakeside Resort",
      hallName: "The Grand Evergreen Ballroom",
      cityState: "Stone Mountain, GA",
      address: "4021 Lakeview Dr, Stone Mountain, GA 30083",
      dressCode: "Black Tie / Indo-Western Glamour / Formal Evening Wear",
      dressCodeColorHex: "#7C3AED",
      dressCodeSuggestion: "Tuxedos, formal suits, bandhgalas, evening gowns, or embellished designer sarees.",
      description: "An unforgettable evening celebrating the newly married couple with heartfelt family toasts, live music, a royal banquet dinner, and dancing.",
      iconName: "sparkles",
      googleMapsUrl: "https://maps.google.com/?q=Atlanta+Evergreen+Lakeside+Resort,+4021+Lakeview+Dr,+Stone+Mountain,+GA+30083",
      calendarEvent: {
        title: "Shreyas & Neevedita — Wedding Reception",
        description: "Celebrate the newlyweds with royal dinner, toasts, and music.",
        location: "Atlanta Evergreen Lakeside Resort, 4021 Lakeview Dr, Stone Mountain, GA 30083",
        startDate: "20270530T183000Z",
        endDate: "20270530T233000Z"
      }
    }
  ],

  rsvp: {
    deadline: "April 20, 2027",
    contactPhone: "1234567890",
    contactName: "Wedding Hospitality Desk"
  }
};
