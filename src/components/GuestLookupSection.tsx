import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig, WeddingEvent } from '../weddingConfig';
import { lookupGuest, getFamilyMembers, GuestProfile } from '../guestData';
import { GuestRsvpRecord, RSVP_STORAGE_KEY } from '../types/rsvp';
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
  Flower2,
  CheckCircle2,
  XCircle,
  Send,
  MessageSquare,
  Palette,
  RotateCcw,
  Heart,
  SearchX,
  Users
} from 'lucide-react';

export const GuestLookupSection: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeGuest, setActiveGuest] = useState<GuestProfile | null>(null);
  const [notFoundName, setNotFoundName] = useState<string | null>(null);

  // Per-member per-event responses: { [memberId]: { [eventId]: 'yes' | 'no' } }
  // Stored empty initially so guests must explicitly make their selections
  const [memberResponses, setMemberResponses] = useState<Record<string, Record<string, 'yes' | 'no'>>>({});
  const [blessingMessage, setBlessingMessage] = useState('');
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Family members list: active guest is positioned first (as the responding guest), followed by their family members
  const familyMembers: GuestProfile[] = activeGuest
    ? activeGuest.familyId
      ? [activeGuest, ...getFamilyMembers(activeGuest.familyId).filter((m) => m.id !== activeGuest.id)]
      : [activeGuest]
    : [];

  // Dynamic invitation display title (e.g. "Ishaan Goswami & Family" or "Yogesh Goswami & Family")
  const invitationDisplayName = activeGuest
    ? familyMembers.length > 1
      ? `${activeGuest.name} & Family`
      : activeGuest.name
    : '';

  // Filter events based on active guest invitation (all 5 for family)
  const invitedEvents: WeddingEvent[] = activeGuest
    ? weddingConfig.events.filter((e) => activeGuest.invitedEventIds.includes(e.id))
    : [];

  const handleSelectMemberEventResponse = (memberId: string, eventId: string, response: 'yes' | 'no') => {
    setMemberResponses((prev) => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        [eventId]: response,
      },
    }));
    setValidationError(null);
  };

  const handleSelectAllMembersForEvent = (eventId: string, response: 'yes' | 'no') => {
    setMemberResponses((prev) => {
      const updated = { ...prev };
      familyMembers.forEach((m) => {
        updated[m.id] = {
          ...(updated[m.id] || {}),
          [eventId]: response,
        };
      });
      return updated;
    });
    setValidationError(null);
  };

  const handleSelectAllFamilyAllEvents = (response: 'yes' | 'no') => {
    setMemberResponses(() => {
      const updated: Record<string, Record<string, 'yes' | 'no'>> = {};
      familyMembers.forEach((m) => {
        updated[m.id] = {};
        invitedEvents.forEach((ev) => {
          updated[m.id][ev.id] = response;
        });
      });
      return updated;
    });
    setValidationError(null);
  };

  const handleSearch = (nameToSearch?: string) => {
    const query = (nameToSearch !== undefined ? nameToSearch : searchInput).trim();
    if (!query) return;

    const matched = lookupGuest(query);

    if (matched) {
      setActiveGuest(matched);
      setNotFoundName(null);
      setIsRsvpSubmitted(false);
      setValidationError(null);

      // Check if this family / guest already has a recorded RSVP to pre-load
      try {
        const existing: GuestRsvpRecord[] = JSON.parse(
          localStorage.getItem(RSVP_STORAGE_KEY) || localStorage.getItem('shreyas_neevedita_wedding_rsvps') || '[]'
        );
        const savedRecord = existing.find(
          (r) =>
            (r.familyId && matched.familyId && r.familyId === matched.familyId) ||
            r.guestName.toLowerCase() === matched.name.toLowerCase()
        );

        if (savedRecord && savedRecord.memberResponses) {
          setMemberResponses(savedRecord.memberResponses);
          setBlessingMessage(savedRecord.blessingMessage || '');
        } else {
          setMemberResponses({});
          setBlessingMessage('');
        }
      } catch {
        setMemberResponses({});
        setBlessingMessage('');
      }

      // Smooth scroll down to personalized results
      setTimeout(() => {
        const resultsEl = document.getElementById('invitation-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Name not found in guest list - do NOT show events
      setActiveGuest(null);
      setNotFoundName(query);
      setIsRsvpSubmitted(false);
      setValidationError(null);

      setTimeout(() => {
        const notFoundEl = document.getElementById('invitation-not-found');
        if (notFoundEl) {
          notFoundEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    setActiveGuest(null);
    setNotFoundName(null);
    setSearchInput('');
    setIsRsvpSubmitted(false);
    setMemberResponses({});
    setBlessingMessage('');
    setValidationError(null);
  };

  const getEventIcon = (iconName: WeddingEvent['iconName']) => {
    switch (iconName) {
      case 'flower':
        return <Flower2 className="w-5 h-5 text-emerald-600" />;
      case 'music':
        return <Music className="w-5 h-5 text-amber-600" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
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
    if (!activeGuest) return;

    // Verify all members have an explicit response for each invited event
    for (const ev of invitedEvents) {
      for (const m of familyMembers) {
        const resp = memberResponses[m.id]?.[ev.id];
        if (!resp) {
          setValidationError(`Please select "Yes" or "No" for ${m.name} for ${ev.name}`);
          const firstEl = document.getElementById(`event-card-${ev.id}`);
          if (firstEl) {
            firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
      }
    }

    const eventResponses: Record<string, 'yes' | 'no'> = {};
    const eventAttendees: Record<string, string[]> = {};
    const eventDeclines: Record<string, string[]> = {};

    invitedEvents.forEach((ev) => {
      const attendees = familyMembers
        .filter((m) => memberResponses[m.id]?.[ev.id] === 'yes')
        .map((m) => m.name);
      const declines = familyMembers
        .filter((m) => memberResponses[m.id]?.[ev.id] === 'no')
        .map((m) => m.name);

      eventAttendees[ev.id] = attendees;
      eventDeclines[ev.id] = declines;
      eventResponses[ev.id] = attendees.length > 0 ? 'yes' : 'no';
    });

    const newRecord: GuestRsvpRecord = {
      id: `rsvp-${Date.now()}`,
      guestName: activeGuest.name,
      familyId: activeGuest.familyId,
      familyGroupName: invitationDisplayName,
      familyMembers: familyMembers.map((m) => m.name),
      guestCount: familyMembers.length,
      eventResponses,
      memberResponses,
      eventAttendees,
      eventDeclines,
      blessingMessage,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const existing: GuestRsvpRecord[] = JSON.parse(
        localStorage.getItem(RSVP_STORAGE_KEY) || localStorage.getItem('shreyas_neevedita_wedding_rsvps') || '[]'
      );
      // Replace existing submission for this family group if updated, or prepend
      const filtered = existing.filter((r) => {
        if (newRecord.familyId && r.familyId) {
          return r.familyId !== newRecord.familyId;
        }
        return r.guestName.toLowerCase() !== newRecord.guestName.toLowerCase();
      });
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify([newRecord, ...filtered]));
    } catch {
      // ignore
    }

    setIsRsvpSubmitted(true);
    setValidationError(null);
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
    const isGroup = familyMembers.length > 1;

    const eventSummaries = weddingConfig.events
      .map((e) => {
        const attendees = familyMembers
          .filter((m) => memberResponses[m.id]?.[e.id] === 'yes')
          .map((m) => m.name);
        if (attendees.length === familyMembers.length) {
          return `• ${e.name}: All ${familyMembers.length} Attending`;
        } else if (attendees.length > 0) {
          return `• ${e.name}: ${attendees.length} Attending (${attendees.join(', ')})`;
        } else {
          return `• ${e.name}: Unable to Attend`;
        }
      })
      .join('\n');

    const text = encodeURIComponent(
      `*Wedding RSVP Confirmation for Neevedita & Shreyas*\n` +
      `📍 Location: Atlanta, Georgia (May 28-30)\n` +
      `👤 Invitation: ${invitationDisplayName}\n` +
      (isGroup ? `👥 Guests (${familyMembers.length}): ${familyMembers.map((m) => m.name).join(', ')}\n\n` : '\n') +
      `*Ceremony Attendance:*\n${eventSummaries}\n\n` +
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
            Atlanta, Georgia • May 28 – 30
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            Find Your Invitation & Schedule
          </h2>
          <MandalaDivider className="my-5" />
          <p className="text-sm sm:text-base text-charcoal-light font-serif leading-relaxed">
            Please enter your full name below to access your ceremony schedule and RSVP for yourself and your family.
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
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInput(val);
                    if (activeGuest || notFoundName) {
                      setActiveGuest(null);
                      setNotFoundName(null);
                      setIsRsvpSubmitted(false);
                      setMemberResponses({});
                    }
                  }}
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
            <p className="text-[11px] text-charcoal-light font-serif">
              Tip: You can search by your first name or full name to access your family group invitation.
            </p>
          </form>
        </div>

        {/* ================= NOT FOUND CARD ================= */}
        {notFoundName && !activeGuest && (
          <div id="invitation-not-found" className="bg-ivory-50 rounded-2xl border border-gold/40 p-8 sm:p-10 text-center max-w-xl mx-auto shadow-sm animate-fadeIn mb-12">
            <div className="w-14 h-14 rounded-full bg-sandstone/60 border border-gold/30 text-maroon flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal mb-2">
              No Invitation Found
            </h3>

            <p className="text-sm font-serif text-maroon font-medium mb-3">
              We couldn't locate an invitation for "{notFoundName}".
            </p>

            <p className="text-xs sm:text-sm text-charcoal-light font-serif leading-relaxed mb-6">
              Please double-check the spelling of your name. If you believe this is an error, please reach out directly to Neevedita or Shreyas.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-ivory-100 hover:bg-gold-light/30 border border-gold/40 text-xs text-charcoal font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-maroon" />
              <span>Try Another Name</span>
            </button>
          </div>
        )}

        {/* ================= PERSONALIZED RESULTS CONTAINER ================= */}
        {activeGuest && (
          <div id="invitation-results" className="space-y-10 animate-fadeIn">
            {/* Guest Welcome Banner */}
            <div className="bg-gradient-to-br from-ivory-50 via-gold-light/15 to-ivory-100 rounded-2xl border-2 border-gold/50 p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-sandstone/60 border border-gold/30 text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Invitation Confirmed</span>
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal">
                    Welcome, {invitationDisplayName}
                  </h3>

                  <p className="text-xs sm:text-sm text-gold-dark font-serif italic mt-1">
                    {activeGuest.note || "Neevedita & Shreyas are overjoyed to celebrate our wedding ceremonies with you in Atlanta."}
                  </p>

                  {familyMembers.length > 1 && (
                    <div className="mt-3 flex items-center space-x-2 text-xs text-charcoal-light">
                      <Users className="w-4 h-4 text-maroon" />
                      <span>
                        Invitation for <strong>{invitationDisplayName}</strong> ({familyMembers.length} Guests: {familyMembers.map((m) => m.name).join(', ')})
                      </span>
                    </div>
                  )}
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
            </div>

            {/* Family Group Quick-RSVP Bar */}
            {familyMembers.length > 1 && (
              <div className="bg-gradient-to-r from-ivory-100 via-gold-light/20 to-ivory-100 rounded-2xl border border-gold/40 p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-maroon" />
                      <h4 className="text-sm sm:text-base font-serif font-semibold text-charcoal">
                        RSVP for {invitationDisplayName}
                      </h4>
                    </div>
                    <p className="text-xs text-charcoal-light font-serif">
                      Responding for: {familyMembers.map((m) => m.name).join(', ')}.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectAllFamilyAllEvents('yes')}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All {familyMembers.length} Attending All Events</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectAllFamilyAllEvents('no')}
                      className="px-3.5 py-2 rounded-xl bg-ivory-50 hover:bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium transition-colors"
                    >
                      <span>Decline All</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List of Specific Events Invited To */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-charcoal">
                    Ceremony Schedule & In-Card RSVP
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light font-serif">
                    Please indicate <strong>Yes (Attending)</strong> or <strong>No (Decline)</strong> for each family member under each ceremony.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {invitedEvents.map((ev, idx) => {
                  // Calculate summary for this event
                  const eventMemberAnswers = familyMembers.map((m) => memberResponses[m.id]?.[ev.id]);
                  const allAnswered = eventMemberAnswers.every(Boolean);
                  const yesCount = eventMemberAnswers.filter((a) => a === 'yes').length;
                  const noCount = eventMemberAnswers.filter((a) => a === 'no').length;

                  return (
                    <div
                      key={ev.id}
                      id={`event-card-${ev.id}`}
                      className={`relative flex flex-col justify-between bg-ivory-50 rounded-2xl border transition-all p-6 sm:p-7 ${
                        allAnswered && yesCount > 0
                          ? 'border-emerald-600/50 shadow-md ring-1 ring-emerald-500/20'
                          : allAnswered && yesCount === 0
                          ? 'border-rose-400/50 shadow-xs opacity-80'
                          : 'border-gold/40 shadow-xs hover:border-gold'
                      }`}
                    >
                      {/* Top color strip */}
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
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-serif text-charcoal mb-2">
                          {ev.name}
                        </h4>

                        <p className="text-xs text-charcoal-light font-serif leading-relaxed mb-4">
                          {ev.description}
                        </p>

                        {/* Timings and Venue in Atlanta */}
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
                              <span className="text-charcoal-light block">{ev.venueName} • {ev.cityState}</span>
                            </div>
                          </div>
                        </div>

                        {/* Dress Code */}
                        <div className="p-3 rounded-xl bg-ivory-100/70 border border-gold/25 mb-4 text-xs">
                          <div className="flex items-center space-x-1.5 mb-0.5">
                            <Palette className="w-3.5 h-3.5 text-gold-dark" />
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-dark">
                              Suggested Attire
                            </span>
                          </div>
                          <p className="font-medium text-charcoal">{ev.dressCode}</p>
                          <p className="text-[11px] text-charcoal-light font-serif italic">{ev.dressCodeSuggestion}</p>
                        </div>

                        {/* ================= IN-CARD FAMILY RSVP SECTION ================= */}
                        <div className="p-4 rounded-xl border border-gold/30 bg-ivory-100/80 mb-4 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold/20 pb-2.5">
                            <div>
                              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                                RSVP for {ev.name}
                              </span>
                              <span className="text-[11px] font-serif">
                                {allAnswered ? (
                                  yesCount === familyMembers.length ? (
                                    <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                                      All {familyMembers.length} Attending
                                    </span>
                                  ) : yesCount > 0 ? (
                                    <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                                      {yesCount} Attending ({noCount} Declined)
                                    </span>
                                  ) : (
                                    <span className="text-rose-700 font-semibold inline-flex items-center gap-1">
                                      <XCircle className="w-3.5 h-3.5 text-rose-600 inline" />
                                      All Declined
                                    </span>
                                  )
                                ) : (
                                  <span className="text-amber-800 font-serif italic font-medium">
                                    * Please select Yes or No for each person
                                  </span>
                                )}
                              </span>
                            </div>

                            {/* Quick batch toggle for this ceremony */}
                            <div className="inline-flex rounded-lg p-0.5 bg-ivory-50 border border-gold/30 self-start sm:self-auto">
                              <button
                                type="button"
                                onClick={() => handleSelectAllMembersForEvent(ev.id, 'yes')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 rounded"
                                title="Mark all family members as attending this ceremony"
                              >
                                All Yes ({familyMembers.length})
                              </button>
                              <span className="text-gold/40 self-center">|</span>
                              <button
                                type="button"
                                onClick={() => handleSelectAllMembersForEvent(ev.id, 'no')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-50 rounded"
                                title="Mark all family members as declining this ceremony"
                              >
                                All No
                              </button>
                            </div>
                          </div>

                          {/* Member-by-Member Rows */}
                          <div className="space-y-2 pt-1">
                            {familyMembers.map((member) => {
                              const resp = memberResponses[member.id]?.[ev.id];
                              const isMemberYes = resp === 'yes';
                              const isMemberNo = resp === 'no';
                              const isSearchingGuest = member.id === activeGuest.id;

                              return (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-ivory-50/90 border border-gold/20"
                                >
                                  <div>
                                    <span className="text-xs font-serif font-semibold text-charcoal block">
                                      {member.name}
                                    </span>
                                    {isSearchingGuest && (
                                      <span className="text-[10px] text-gold-dark font-sans block">
                                        (You)
                                      </span>
                                    )}
                                  </div>

                                  <div className="inline-flex rounded-lg p-0.5 bg-ivory-100 border border-gold/30">
                                    <button
                                      type="button"
                                      onClick={() => handleSelectMemberEventResponse(member.id, ev.id, 'yes')}
                                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition-all ${
                                        isMemberYes
                                          ? 'bg-emerald-600 text-white shadow-xs'
                                          : 'text-charcoal hover:text-emerald-700 hover:bg-emerald-50'
                                      }`}
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Yes</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleSelectMemberEventResponse(member.id, ev.id, 'no')}
                                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition-all ${
                                        isMemberNo
                                          ? 'bg-rose-600 text-white shadow-xs'
                                          : 'text-charcoal hover:text-rose-700 hover:bg-rose-50'
                                      }`}
                                    >
                                      <XCircle className="w-3 h-3" />
                                      <span>No</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Calendar & Map Directions buttons */}
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
                  );
                })}
              </div>
            </div>

            {/* ================= CONFIRM & SUBMIT RSVP SECTION ================= */}
            <div id="guest-rsvp" className="bg-ivory-50 rounded-2xl border-2 border-gold/40 shadow-sm p-6 sm:p-10">
              {isRsvpSubmitted ? (
                <div className="text-center py-8 space-y-5 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
                    RSVP Recorded for {invitationDisplayName}!
                  </h3>
                  <p className="text-sm font-serif text-charcoal-light max-w-md mx-auto">
                    Thank you for responding on behalf of {familyMembers.map((m) => m.name).join(', ')}. Your ceremony attendance choices have been saved to the host headcount!
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
                      Finalize Your RSVP
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
                      Confirm Response for {invitationDisplayName}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-light font-serif mt-1">
                      Check each guest's Yes/No choices in the ceremony cards above, then submit below by {weddingConfig.rsvp.deadline}.
                    </p>
                  </div>

                  {/* Family Members Summary Card */}
                  <div className="p-4 rounded-xl bg-ivory-100 border border-gold/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                        {invitationDisplayName} ({familyMembers.length} {familyMembers.length === 1 ? 'Guest' : 'Guests'})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {familyMembers.map((m) => (
                        <div key={m.id} className="p-2.5 rounded-lg bg-ivory-50 border border-gold/20 text-center">
                          <span className="font-serif font-semibold text-xs text-charcoal block">
                            {m.name}
                          </span>
                          {m.id === activeGuest.id && (
                            <span className="text-[10px] text-gold-dark font-sans block mt-0.5">
                              (You)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-gold-dark font-serif italic mt-3">
                      All wedding celebrations feature traditional, 100% vegetarian culinary spreads.
                    </p>
                  </div>

                  {/* Blessings message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                      Blessings & Wishes for Neevedita & Shreyas
                    </label>
                    <textarea
                      rows={3}
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Share your warm wishes, blessings, or notes for the couple..."
                      className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/30 text-charcoal text-sm focus:border-gold focus:outline-none resize-none font-serif"
                    />
                  </div>

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-medium flex items-center space-x-2 animate-fadeIn">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Submit RSVP */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-200 border border-gold/40 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-gold-light" />
                    <span>Submit Complete Family RSVP</span>
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
