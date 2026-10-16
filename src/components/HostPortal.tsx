import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../weddingConfig';
import { GuestRsvpRecord, RSVP_STORAGE_KEY } from '../types/rsvp';
import { MandalaDivider } from './MandalaDivider';
import {
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Trash2,
  Calendar,
  ArrowLeft,
  RefreshCw,
  Sun,
  Flame,
  Music,
  Sparkles,
  Flower2,
  KeyRound
} from 'lucide-react';

interface HostPortalProps {
  onClose: () => void;
}

export const HostPortal: React.FC<HostPortalProps> = ({ onClose }) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rsvps, setRsvps] = useState<GuestRsvpRecord[]>([]);

  // Check if session is already authenticated
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('host_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load RSVPs from localStorage
  const loadRsvps = () => {
    try {
      const data = localStorage.getItem(RSVP_STORAGE_KEY);
      if (data) {
        setRsvps(JSON.parse(data));
      } else {
        setRsvps([]);
      }
    } catch {
      setRsvps([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRsvps();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '0000') {
      setIsAuthenticated(true);
      setErrorMsg('');
      sessionStorage.setItem('host_authenticated', 'true');
    } else {
      setErrorMsg('Incorrect PIN. Please enter 0000.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('host_authenticated');
    setPinInput('');
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all recorded RSVP data? This cannot be undone.")) {
      localStorage.removeItem(RSVP_STORAGE_KEY);
      setRsvps([]);
    }
  };

  const handleExportCsv = () => {
    if (rsvps.length === 0) return;

    const eventNames = weddingConfig.events.map((e) => e.name);
    const headers = ['Guest Name', 'Total Guests', ...eventNames, 'Dietary Preference', 'Notes', 'Submitted At'];

    const rows = rsvps.map((r) => {
      const eventStatuses = weddingConfig.events.map((e) => {
        const resp = r.eventResponses[e.id];
        return resp === 'yes' ? 'Yes (Attending)' : 'No (Declined)';
      });

      return [
        `"${r.guestName}"`,
        r.guestCount,
        ...eventStatuses.map((s) => `"${s}"`),
        `"${r.dietaryPreference}"`,
        `"${(r.blessingMessage || '').replace(/"/g, '""')}"`,
        `"${r.submittedAt}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wedding_headcount_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEventIcon = (id: string) => {
    switch (id) {
      case 'mehendi':
        return <Flower2 className="w-4 h-4 text-emerald-600" />;
      case 'garba':
        return <Music className="w-4 h-4 text-amber-600" />;
      case 'vidhi':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'lagna':
        return <Flame className="w-4 h-4 text-orange-600" />;
      case 'reception':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gold-dark" />;
    }
  };

  // Compute Headcount metrics per event
  const computeEventMetrics = (eventId: string) => {
    let attendingHeadcount = 0;
    let declinedHeadcount = 0;
    const attendingGuests: string[] = [];
    const declinedGuests: string[] = [];

    rsvps.forEach((r) => {
      const resp = r.eventResponses[eventId];
      if (resp === 'yes') {
        attendingHeadcount += r.guestCount || 1;
        attendingGuests.push(`${r.guestName} (${r.guestCount})`);
      } else if (resp === 'no') {
        declinedHeadcount += r.guestCount || 1;
        declinedGuests.push(`${r.guestName}`);
      }
    });

    return { attendingHeadcount, declinedHeadcount, attendingGuests, declinedGuests };
  };

  // ================= PIN LOCK SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-ivory-50 rounded-2xl border-2 border-gold/50 shadow-2xl p-6 sm:p-10 max-w-md w-full relative animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-sandstone/60 border border-gold/40 text-maroon flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-charcoal text-center font-normal mb-1">
            Private Host Portal
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-light font-serif text-center mb-6">
            Enter host password to view ceremony headcounts & guest RSVPs.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                Host PIN Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gold-dark absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  autoFocus
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 0000)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-ivory-100 border border-gold/40 text-charcoal text-center tracking-widest text-lg font-mono focus:outline-none focus:border-gold"
                />
              </div>
              <p className="text-[11px] text-gold-dark font-serif italic mt-1.5 text-center">
                Default PIN is <strong className="font-mono">0000</strong>
              </p>
            </div>

            {errorMsg && (
              <p className="text-xs text-vermilion text-center font-medium">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-gold/30 text-xs uppercase tracking-wider text-charcoal font-medium transition-colors"
              >
                Back to Site
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs uppercase tracking-wider font-semibold shadow transition-all border border-gold/40 flex items-center justify-center space-x-1.5"
              >
                <Unlock className="w-4 h-4 text-gold-light" />
                <span>Unlock Portal</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DASHBOARD =================
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ivory-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-ivory-50 p-6 rounded-2xl border border-gold/40 shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-ivory-100 hover:bg-ivory-200 border border-gold/30 text-charcoal transition-colors"
              title="Return to wedding invitation"
            >
              <ArrowLeft className="w-4 h-4 text-maroon" />
            </button>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-gold-dark font-semibold block">
                Shreyas & Neevedita • Host Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
                Ceremony Headcount & RSVP Dashboard
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadRsvps}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-ivory-100 hover:bg-gold-light/20 border border-gold/30 text-xs text-charcoal font-medium transition-colors"
              title="Refresh live count"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold-dark" />
              <span>Refresh</span>
            </button>

            {rsvps.length > 0 && (
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium tracking-wider uppercase shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs font-medium tracking-wider uppercase transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-gold-light" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* ================= 5 EVENTS HEADCOUNT SUMMARY CARDS ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-serif text-charcoal font-medium flex items-center space-x-2">
              <Users className="w-5 h-5 text-maroon" />
              <span>Live Headcount by Ceremony</span>
            </h3>
            <span className="text-xs text-gold-dark font-serif font-semibold">
              Total RSVPs Submitted: {rsvps.length}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {weddingConfig.events.map((ev) => {
              const { attendingHeadcount, declinedHeadcount, attendingGuests, declinedGuests } = computeEventMetrics(ev.id);

              return (
                <div
                  key={ev.id}
                  className="bg-ivory-50 rounded-2xl border border-gold/35 shadow-xs p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Event Header */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-ivory-100 border border-gold/30 flex items-center justify-center">
                        {getEventIcon(ev.id)}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-charcoal">
                          {ev.name}
                        </h4>
                        <span className="text-[10px] text-charcoal-light block">
                          {ev.date.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gold/20 space-y-2">
                      {/* Attending Count */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <span className="text-xs font-semibold text-emerald-800 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Attending:</span>
                        </span>
                        <span className="text-base font-bold text-emerald-900 font-serif">
                          {attendingHeadcount} {attendingHeadcount === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>

                      {/* Declined Count */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/70 border border-rose-200">
                        <span className="text-xs font-medium text-rose-800 flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Declined:</span>
                        </span>
                        <span className="text-sm font-semibold text-rose-900 font-serif">
                          {declinedHeadcount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Names breakdown for this event */}
                  <div className="pt-3 mt-3 border-t border-dashed border-gold/25 text-[11px] text-charcoal-light">
                    {attendingGuests.length > 0 ? (
                      <div>
                        <span className="font-semibold text-emerald-800 block mb-0.5">Who said Yes:</span>
                        <p className="line-clamp-2 italic">{attendingGuests.join(', ')}</p>
                      </div>
                    ) : (
                      <span className="italic text-charcoal-light/70">No confirmed attendees yet</span>
                    )}

                    {declinedGuests.length > 0 && (
                      <div className="mt-1.5 pt-1.5 border-t border-gold/15">
                        <span className="font-semibold text-rose-800 block mb-0.5">Who said No:</span>
                        <p className="line-clamp-2 italic">{declinedGuests.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= GUEST SUBMISSION RECORDS TABLE ================= */}
        <div className="bg-ivory-50 rounded-2xl border border-gold/40 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gold/25 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif text-charcoal font-normal">
                Guest Responses & Attendance Breakdown
              </h3>
              <p className="text-xs text-charcoal-light font-serif mt-0.5">
                Shows each guest's Yes/No choices across all 5 celebrations.
              </p>
            </div>

            {rsvps.length > 0 && (
              <button
                onClick={handleClearData}
                className="inline-flex items-center space-x-1 text-xs text-vermilion hover:text-maroon transition-colors"
                title="Clear all recorded test data"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </button>
            )}
          </div>

          {rsvps.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-sandstone/50 border border-gold/30 text-gold-dark flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif text-charcoal">No Responses Recorded Yet</h4>
              <p className="text-xs sm:text-sm text-charcoal-light font-serif max-w-md mx-auto">
                To test this: Click "Back to Site", enter <strong>"Ishaan Goswami"</strong>, select Yes/No for each ceremony, and click Submit. When you unlock this portal again, your responses will appear here instantly!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-charcoal">
                <thead className="bg-ivory-200/80 uppercase tracking-wider font-semibold text-gold-dark border-b border-gold/25 text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Guest Name</th>
                    <th className="px-4 py-3.5">Guests</th>
                    <th className="px-3 py-3.5 text-center">Mehendi</th>
                    <th className="px-3 py-3.5 text-center">Garba</th>
                    <th className="px-3 py-3.5 text-center">Vidhi</th>
                    <th className="px-3 py-3.5 text-center">Lagna</th>
                    <th className="px-3 py-3.5 text-center">Reception</th>
                    <th className="px-4 py-3.5">Dietary</th>
                    <th className="px-5 py-3.5">Message / Note</th>
                    <th className="px-4 py-3.5">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {rsvps.map((record) => (
                    <tr key={record.id} className="hover:bg-gold-light/10 transition-colors">
                      <td className="px-5 py-4 font-serif font-semibold text-sm text-charcoal">
                        {record.guestName}
                      </td>

                      <td className="px-4 py-4 font-mono font-medium">
                        {record.guestCount}
                      </td>

                      {/* Per-event Yes/No indicators */}
                      {['mehendi', 'garba', 'vidhi', 'lagna', 'reception'].map((eventId) => {
                        const status = record.eventResponses[eventId];
                        const isYes = status === 'yes';

                        return (
                          <td key={eventId} className="px-3 py-4 text-center">
                            {status ? (
                              <span
                                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                  isYes
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                }`}
                              >
                                {isYes ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>Yes</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3 text-rose-600" />
                                    <span>No</span>
                                  </>
                                )}
                              </span>
                            ) : (
                              <span className="text-charcoal-light/40">—</span>
                            )}
                          </td>
                        );
                      })}

                      <td className="px-4 py-4 text-charcoal-light">
                        {record.dietaryPreference || 'Vegetarian'}
                      </td>

                      <td className="px-5 py-4 text-charcoal-light italic font-serif max-w-xs truncate" title={record.blessingMessage}>
                        {record.blessingMessage ? `"${record.blessingMessage}"` : '—'}
                      </td>

                      <td className="px-4 py-4 text-[10px] text-charcoal-light whitespace-nowrap">
                        {record.submittedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <MandalaDivider className="my-8" />
      </div>
    </div>
  );
};
