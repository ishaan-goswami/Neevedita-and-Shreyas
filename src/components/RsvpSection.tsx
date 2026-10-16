import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../weddingConfig';
import { MandalaDivider } from './MandalaDivider';
import { CheckCircle2, Send, MessageSquare, Download, Users } from 'lucide-react';

interface RsvpData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  attendingEvents: string[];
  guestCount: number;
  dietaryPreference: string;
  blessingMessage: string;
  submittedAt: string;
}

export const RsvpSection: React.FC = () => {
  const { rsvp, events } = weddingConfig;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    attendingEvents: events.map((e) => e.name), // default checked all
    guestCount: 2,
    dietaryPreference: 'Vegetarian',
    blessingMessage: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [storedRsvps, setStoredRsvps] = useState<RsvpData[]>([]);
  const [showAdminList, setShowAdminList] = useState(false);

  // Load existing RSVPs from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem('wedding_rsvps');
      if (data) {
        setStoredRsvps(JSON.parse(data));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleEventToggle = (eventName: string) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventName);
      if (exists) {
        return {
          ...prev,
          attendingEvents: prev.attendingEvents.filter((e) => e !== eventName),
        };
      } else {
        return {
          ...prev,
          attendingEvents: [...prev.attendingEvents, eventName],
        };
      }
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#9B2C2C', '#F59E0B', '#FAF8F5'],
      });
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRsvp: RsvpData = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toLocaleString(),
    };

    const updated = [newRsvp, ...storedRsvps];
    setStoredRsvps(updated);
    try {
      localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    triggerConfetti();
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `*Wedding RSVP Confirmation*\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📞 Contact: ${formData.phone}\n` +
      `👥 Total Guests: ${formData.guestCount}\n` +
      `🍛 Dietary: ${formData.dietaryPreference}\n` +
      `🎉 Ceremonies Attending: ${formData.attendingEvents.join(', ') || 'None'}\n` +
      `💌 Blessings: ${formData.blessingMessage || 'Best wishes for a blissful married life!'}`
    );
    return `https://wa.me/${rsvp.contactPhone}?text=${text}`;
  };

  const exportCsv = () => {
    if (storedRsvps.length === 0) return;
    const headers = ['Full Name', 'Phone', 'Email', 'Guests Count', 'Dietary', 'Events', 'Message', 'Submitted At'];
    const rows = storedRsvps.map((r) => [
      `"${r.fullName}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      r.guestCount,
      `"${r.dietaryPreference}"`,
      `"${r.attendingEvents.join('; ')}"`,
      `"${r.blessingMessage.replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wedding_rsvps_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 bg-ivory-100/60 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
            Kindly Respond By {rsvp.deadline}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
            RSVP & Blessings
          </h2>
          <MandalaDivider className="my-6" />
          <p className="text-xs sm:text-sm text-charcoal-light font-serif">
            Your presence will illuminate our special days with warmth, laughter, and lifelong memories.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-ivory-50 rounded-2xl border border-gold/40 shadow-sm p-6 sm:p-10 relative">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm font-serif text-charcoal-light max-w-md mx-auto">
                  Your RSVP has been joyfully recorded. We cannot wait to celebrate our auspicious wedding ceremonies with you!
                </p>
              </div>

              {/* Direct WhatsApp Share */}
              <div className="pt-4 max-w-sm mx-auto space-y-3">
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
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gold-dark hover:text-maroon underline font-serif"
                >
                  Edit or submit another response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                  Full Name <span className="text-vermilion">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rajesh & Sunita Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors"
                />
              </div>

              {/* Phone and Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    WhatsApp / Phone <span className="text-vermilion">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Guest Count & Dietary Preference */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Total Attending Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Dietary Preference
                  </label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors"
                  >
                    <option value="Vegetarian">Pure Vegetarian</option>
                    <option value="Jain Vegetarian">Jain Vegetarian (No root vegetables)</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No Restrictions">No Restrictions</option>
                  </select>
                </div>
              </div>

              {/* Attending Events Checkboxes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                  Which ceremonies will you be attending?
                </label>
                <div className="space-y-2.5 pt-1">
                  {events.map((ev) => {
                    const isChecked = formData.attendingEvents.includes(ev.name);
                    return (
                      <label
                        key={ev.id}
                        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-gold-light/20 border-gold/60 text-charcoal'
                            : 'bg-ivory-100/60 border-gold/20 text-charcoal-light hover:border-gold/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleEventToggle(ev.name)}
                          className="w-4 h-4 rounded text-maroon accent-maroon focus:ring-gold"
                        />
                        <div className="flex-1 text-xs sm:text-sm">
                          <span className="font-medium text-charcoal">{ev.name}</span>
                          <span className="text-gold-dark text-xs block sm:inline sm:ml-2">
                            ({ev.date.split(',')[0]} • {ev.time.split('•')[0].trim()})
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message / Blessings */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                  Blessings & Wishes for the Couple
                </label>
                <textarea
                  rows={3}
                  value={formData.blessingMessage}
                  onChange={(e) => setFormData({ ...formData, blessingMessage: e.target.value })}
                  placeholder="Share a heartfelt blessing, advice, or song request..."
                  className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/30 focus:border-gold focus:outline-none text-charcoal text-sm transition-colors resize-none font-serif"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-maroon hover:bg-maroon-dark text-ivory-50 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-200 border border-gold/40 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-gold-light" />
                <span>Confirm Wedding RSVP</span>
              </button>
            </form>
          )}

          {/* Local Submissions Admin Drawer (Useful for the couple while testing) */}
          <div className="mt-8 pt-6 border-t border-dashed border-gold/30 flex items-center justify-between text-xs text-charcoal-light">
            <button
              type="button"
              onClick={() => setShowAdminList(!showAdminList)}
              className="flex items-center space-x-1 hover:text-maroon transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              <span>
                {showAdminList ? 'Hide' : 'View'} Saved Responses ({storedRsvps.length})
              </span>
            </button>

            {storedRsvps.length > 0 && (
              <button
                type="button"
                onClick={exportCsv}
                className="flex items-center space-x-1 text-gold-dark hover:text-maroon transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {showAdminList && storedRsvps.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-ivory-100 border border-gold/30 max-h-60 overflow-y-auto space-y-3 text-xs">
              {storedRsvps.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-ivory-50 border border-gold/20">
                  <div className="flex justify-between items-center font-semibold text-charcoal">
                    <span>{item.fullName} ({item.guestCount} guests)</span>
                    <span className="text-[10px] text-charcoal-light">{item.submittedAt}</span>
                  </div>
                  <p className="text-[11px] text-maroon mt-0.5">{item.dietaryPreference} • {item.phone}</p>
                  <p className="text-[11px] text-charcoal-light italic mt-1">"{item.blessingMessage || 'No message'}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
