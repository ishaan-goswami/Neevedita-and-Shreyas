import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig, WeddingEvent } from '../weddingConfig';
import { lookupGuest, GuestProfile, mockGuestsDatabase } from '../guestData';
import { MandalaDivider } from './MandalaDivider';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Sun,
  Flame,
  Music,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
  Palette,
  RotateCcw,
  Heart
} from 'lucide-react';

export const GuestLookupSection: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeGuest, setActiveGuest] = useState<GuestProfile | null>(null);
  const [searchedName, setSearchedName] = useState('');
  const [isGenericFallback, setIsGenericFallback] = useState(false);

  // RSVP Form State for the active guest
  const [rsvpAttendingEvents, setRsvpAttendingEvents] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);

  const handleSearch = (nameToSearch?: string) => {
    const query = (nameToSearch !== undefined ? nameToSearch : searchInput).trim();
    if (!query) return;

    setSearchedName(query);
    const matched = lookupGuest(query);

    if (matched) {
      setActiveGuest(matched);
      setIsGenericFallback(false);
      setRsvpAttendingEvents(matched.invitedEventIds);
      setGuestCount(Math.min(2, 1 + (matched.allowedPlusOnes || 0)));
    } else {
      // Fallback preview for any arbitrary name
      const fallbackGuest: GuestProfile = {
        id: `guest-custom-${Date.now()}`,
        name: query,
        allowedPlusOnes: 1,
        invitedEventIds: weddingConfig.events.map((e) => e.id),
        note: "We are delighted to celebrate with you!"
      };
      setActiveGuest(fallbackGuest);
      setIsGenericFallback(true);
      setRsvpAttendingEvents(fallbackGuest.invitedEventIds);
      setGuestCount(1);
    }

    setIsRsvpSubmitted(false);

    // Smooth scroll down to personalized results
    setTimeout(() => {
      const resultsEl = document.getElementById('invitation-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleReset = () => {
    setActiveGuest(null);
    setSearchInput('');
    setSearchedName('');
    setIsGenericFallback(false);
    setIsRsvpSubmitted(false);
  };

  // Filter events based on active guest invitation
  const invitedEvents: WeddingEvent[] = activeGuest
    ? weddingConfig.events.filter((e) => activeGuest.invitedEventIds.includes(e.id))
    : [];

  const getEventIcon = (iconName: WeddingEvent['iconName']) => {
    switch (iconName) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'music':
        return <Music className="w-5 h-5 text-emerald-600" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Heart className="w-5 h-5 text-maroon" />;
    }
  };

  const createGoogleCalendarUrl = (ev: WeddingEvent) => {
    const { calendarEvent } = ev;
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(calendarEvent.title);
    const details = encodeURIComponent(calendarEvent.description);
    const location = encodeURIComponent(calendarEvent.location);
    const dates = `${calendarEvent.startDate}/${calendarEvent.endDate}`;
    return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage for couple's review
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        guestName: activeGuest?.name || searchedName,
        guestCount,
        dietaryPreference,
        attendingEvents: rsvpAttendingEvents,
        blessingMessage,
        submittedAt: new Date().toLocaleString(),
      };
      localStorage.setItem('wedding_rsvps', JSON.stringify([newEntry, ...existing]));
    } catch {
      // ignore
    }

    setIsRsvpSubmitted(true);
    try {
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7A1C1C', '#F59E0B', '#FAF8F5'],
      });
    } catch {
      // ignore
    }
  };

  const generateWhatsAppUrl = () => {
    const name = activeGuest?.name || searchedName;
    const eventNames = weddingConfig.events
      .filter((e) => rsvpAttendingEvents.includes(e.id))
      .map((e) => e.name)
      .join(', ');

    const text = encodeURIComponent(
      `*Wedding RSVP Confirmation for Shreyas & Neevedita*\n` +
      `👤 Guest Name: ${name}\n` +
      `👥 Total Attending: ${guestCount}\n` +
      `🍛 Dietary Preference: ${dietaryPreference}\n` +
      `🎉 Ceremonies Attending: ${eventNames || 'Regretfully Declining'}\n` +
      `💌 Message: ${blessingMessage || 'Looking forward to celebrating with you!'}`
    );
    return `https://wa.me/${weddingConfig.rsvp.contactPhone}?text=${text}`;
  };

  return (
    <section id="find-events" className="py-16 sm:py-24 px-4 bg-ivory-50 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Guest Invitation Portal
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Find Your Invitation & Schedule
          </h2>
          <MandalaDivider className="my-5" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif leading-relaxed">
            Please enter your full name below to access your personalized wedding itinerary and RSVP.
          </p>
        </div>

        {/* ================= SEARCH INPUT CARD ================= */}
        <div className="bg-ivory-100/90 rounded-2xl border border-gold/40 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto mb-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal">
              Enter Guest Name
            </label>
            <div className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gold-dark absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. Amit Kumar, Priya Sharma..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-ivory-50 border border-gold/40 focus:border-gold focus:outline-none text-charcoal text-sm sm:text-base transition-colors shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-ivory-50 font-medium text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all border border-gold/40 flex items-center justify-center space-x-2"
              >
                <span>View My Events</span>
              </button>
            </div>

            {/* Quick Demo Sample Name Chips */}
            <div className="pt-3 border-t border-dashed border-gold/25">
              <span className="text-[11px] text-charcoal-light uppercase tracking-wider font-semibold block mb-2">
                Sample Test Names (Try Clicking One):
              </span>
              <div className="flex flex-wrap gap-2">
                {mockGuestsDatabase.slice(0, 4).map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSearchInput(sample.name);
                      handleSearch(sample.name);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-ivory-50 hover:bg-gold-light/40 border border-gold/30 text-charcoal transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>{sample.name}</span>
                    <span className="text-[10px] text-gold-dark">
                      ({sample.invitedEventIds.length} events)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* ================= PERSONALIZED RESULTS CONTAINER ================= */}
        {activeGuest && (
          <div id="invitation-results" className="space-y-10 animate-fadeIn">
            {/* Guest Welcome Banner */}
            <div className="bg-gradient-to-br from-ivory-50 via-gold-light/15 to-ivory-100 rounded-2xl border-2 border-gold/50 p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-sandstone/60 border border-gold/30 text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Invitation Found</span>
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal">
                    Welcome, {activeGuest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gold-dark font-serif italic mt-1">
                    {activeGuest.note || "Shreyas & Neevedita are overjoyed to celebrate their special days with you."}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-charcoal-light uppercase tracking-wider block">
                      Invited Ceremonies
                    </span>
                    <span className="text-xl sm:text-2xl font-serif font-bold text-maroon">
                      {invitedEvents.length} Events
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-full bg-ivory-50 hover:bg-ivory-200 border border-gold/30 text-charcoal-light hover:text-maroon transition-colors"
                    title="Search another name"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isGenericFallback && (
                <div className="mt-4 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-sans">
                  <strong>Note:</strong> Showing full schedule preview for "{activeGuest.name}". When you connect your live database later, each guest will automatically see only their assigned events.
                </div>
              )}
            </div>

            {/* List of Specific Events Invited To */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-charcoal">
                    Your Invited Celebrations & Timings
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light font-serif">
                    These are the celebrations arranged for you and your party.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {invitedEvents.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="relative flex flex-col justify-between bg-ivory-50 rounded-2xl border border-gold/35 shadow-sm hover:border-gold/70 transition-all p-6 sm:p-7"
                  >
                    {/* Top strip */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                      style={{ backgroundColor: ev.dressCodeColorHex }}
                    />

                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pt-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-ivory-100 border border-gold/30 flex items-center justify-center">
                            {getEventIcon(ev.iconName)}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold">
                              Ceremony 0{idx + 1}
                            </span>
                            <p className="text-xs text-charcoal-light font-serif">
                              {ev.subtitle}
                            </p>
                          </div>
                        </div>

                        {ev.muhuratNote && (
                          <span className="px-2 py-0.5 rounded-full bg-gold-light/30 border border-gold/30 text-[10px] font-serif font-semibold text-charcoal">
                            {ev.muhuratNote}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-serif text-charcoal mb-2">
                        {ev.name}
                      </h4>

                      <p className="text-xs text-charcoal-light font-serif leading-relaxed mb-4">
                        {ev.description}
                      </p>

                      {/* Timings and Venue */}
                      <div className="space-y-2 text-xs text-charcoal py-3 border-t border-b border-gold/20 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-maroon" />
                          <span className="font-medium">{ev.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-gold-dark" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-maroon mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">{ev.hallName}</span>
                            <span className="text-charcoal-light block">{ev.venueName} • {ev.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Dress Code */}
                      <div className="p-3 rounded-xl bg-ivory-100/70 border border-gold/25 mb-4 text-xs">
                        <div className="flex items-center space-x-1.5 mb-0.5">
                          <Palette className="w-3.5 h-3.5 text-gold-dark" />
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-dark">
                            Dress Code
                          </span>
                        </div>
                        <p className="font-medium text-charcoal">{ev.dressCode}</p>
                        <p className="text-[11px] text-charcoal-light font-serif italic">{ev.dressCodeSuggestion}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-1">
                      <a
                        href={createGoogleCalendarUrl(ev)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-ivory-100 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-maroon" />
                        <span>Add to Calendar</span>
                      </a>
                      <a
                        href={ev.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg bg-ivory-100 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium transition-colors"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= PERSONALIZED RSVP SECTION ================= */}
            <div id="guest-rsvp" className="bg-ivory-50 rounded-2xl border-2 border-gold/40 shadow-sm p-6 sm:p-10">
              {isRsvpSubmitted ? (
                <div className="text-center py-8 space-y-5 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
                    RSVP Confirmed for {activeGuest.name}!
                  </h3>
                  <p className="text-sm font-serif text-charcoal-light max-w-md mx-auto">
                    Thank you for responding. Shreyas, Neevedita, and our families look forward to welcoming you with warmth and joy!
                  </p>

                  <div className="pt-2 max-w-sm mx-auto space-y-3">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium tracking-wider uppercase shadow transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Confirmation via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsRsvpSubmitted(false)}
                      className="text-xs text-gold-dark hover:text-maroon underline font-serif block mx-auto"
                    >
                      Update response
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  <div className="border-b border-gold/25 pb-4">
                    <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-1">
                      RSVP Response
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
                      Confirm Attendance for {activeGuest.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-light font-serif mt-1">
                      Kindly confirm by {weddingConfig.rsvp.deadline}
                    </p>
                  </div>

                  {/* Which events will you attend */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                      Please check the ceremonies you will be attending:
                    </label>
                    <div className="space-y-2">
                      {invitedEvents.map((ev) => {
                        const isChecked = rsvpAttendingEvents.includes(ev.id);
                        return (
                          <label
                            key={ev.id}
                            className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-gold-light/25 border-gold text-charcoal'
                                : 'bg-ivory-100/70 border-gold/20 text-charcoal-light'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setRsvpAttendingEvents((prev) =>
                                  prev.includes(ev.id)
                                    ? prev.filter((id) => id !== ev.id)
                                    : [...prev, ev.id]
                                );
                              }}
                              className="w-4 h-4 rounded text-maroon accent-maroon focus:ring-gold"
                            />
                            <div className="flex-1 text-xs sm:text-sm">
                              <span className="font-medium text-charcoal">{ev.name}</span>
                              <span className="text-gold-dark text-xs block sm:inline sm:ml-2">
                                ({ev.date.split(',')[0]} • {ev.time})
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Attendees Count & Dietary */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                        Total Number of Attendees
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/30 text-charcoal text-sm focus:border-gold focus:outline-none"
                      >
                        {Array.from({ length: 1 + (activeGuest.allowedPlusOnes || 2) }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                        Dietary Preference
                      </label>
                      <select
                        value={dietaryPreference}
                        onChange={(e) => setDietaryPreference(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/30 text-charcoal text-sm focus:border-gold focus:outline-none"
                      >
                        <option value="Vegetarian">Pure Vegetarian</option>
                        <option value="Jain Vegetarian">Jain Vegetarian (No root veggies)</option>
                        <option value="Vegan">Vegan</option>
                        <option value="No Restrictions">No Restrictions</option>
                      </select>
                    </div>
                  </div>

                  {/* Blessings message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                      Blessings & Wishes for Shreyas & Neevedita
                    </label>
                    <textarea
                      rows={3}
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Share your warm wishes, blessings, or notes for the couple..."
                      className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/30 text-charcoal text-sm focus:border-gold focus:outline-none resize-none font-serif"
                    />
                  </div>

                  {/* Submit RSVP */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow transition-all duration-200 border border-gold/40 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-gold-light" />
                    <span>Submit RSVP Response</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
