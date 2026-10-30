import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useRestaurant();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message Sent!', 'Our dining concierge will reply within 2 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#121316] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f76707]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect & Visit Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ed]">
            Get in Touch & Dine With Us
          </h2>
          <p className="text-sm sm:text-base text-[#ede7dd]/70 font-normal">
            Have questions about private dining, dietary requirements, catering, or reservations?
            Our hospitality team is at your service.
          </p>
        </div>

        {/* 2-Column Split: Info & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          
          {/* Left Column: Contact Details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#f7f4ed] flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#f76707]" />
                <span>Restaurant Location</span>
              </h3>
              <p className="text-sm text-[#ede7dd]/80 leading-relaxed">
                742 Grand Boulevard, Suite 100<br />
                Metropolis Cultural District, NY 10001
              </p>
              <div className="pt-2 text-xs text-[#ede7dd]/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Valet parking available at front terrace</span>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#f7f4ed] flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#f76707]" />
                <span>Opening Hours</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#262830]">
                  <span className="text-[#ede7dd]/70">Monday – Thursday</span>
                  <span className="font-semibold text-[#f7f4ed] tabular-nums">11:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#262830]">
                  <span className="text-[#ede7dd]/70">Friday</span>
                  <span className="font-semibold text-[#f7f4ed] tabular-nums">11:00 AM – 12:00 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#262830]">
                  <span className="text-[#ede7dd]/70">Saturday & Sunday</span>
                  <span className="font-semibold text-[#f7f4ed] tabular-nums">10:00 AM – 12:00 AM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#f76707]">Weekend Brunch</span>
                  <span className="font-semibold text-[#f7f4ed] tabular-nums">10:00 AM – 02:30 PM</span>
                </div>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22242a] flex items-center justify-center text-[#f76707] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#ede7dd]/60">Table Reservations & Hotline</div>
                  <a
                    href="tel:+15553528672"
                    className="text-sm font-bold text-[#f7f4ed] hover:text-[#f76707] tabular-nums"
                  >
                    +1 (555) 352-8672
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#262830]">
                <div className="w-10 h-10 rounded-xl bg-[#22242a] flex items-center justify-center text-[#f76707] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#ede7dd]/60">General & Corporate Inquiries</div>
                  <a
                    href="mailto:reservations@flavora-dining.com"
                    className="text-sm font-bold text-[#f7f4ed] hover:text-[#f76707]"
                  >
                    reservations@flavora-dining.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#16171b] border border-[#2b2d35] rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#f7f4ed]">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#ede7dd]/70 mt-1">
                Fill out the form below and our head concierge will respond promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#f7f4ed]">
                  Message Received
                </h4>
                <p className="text-xs text-[#ede7dd]/70 max-w-sm mx-auto">
                  Thank you for reaching out. We have received your inquiry and will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-[#22242a] hover:bg-[#2b2d35] text-xs font-semibold text-white rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Private Event & Catering">Private Event & Catering</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Feedback & Press">Feedback & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us the date, party size, dietary requests, or questions..."
                    className="w-full px-3.5 py-2.5 bg-[#121316] border border-[#2b2d35] rounded-xl text-sm text-[#f7f4ed] focus:outline-none focus:border-[#f76707] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Google Maps Integration Container */}
        <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 bg-[#1a1b1f] border-b border-[#2b2d35] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f76707]/20 text-[#f76707] flex items-center justify-center font-bold text-xs">
                FL
              </div>
              <div>
                <span className="text-sm font-bold text-[#f7f4ed] font-serif block">
                  FLAVORA Restaurant & Wine Bar
                </span>
                <span className="text-xs text-[#ede7dd]/60">
                  742 Grand Boulevard, Metropolis, NY
                </span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=FLAVORA+Restaurant+742+Grand+Boulevard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f76707] hover:text-[#ff922b] transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Styled Google Map View */}
          <div className="relative h-72 sm:h-80 w-full bg-[#121316] overflow-hidden">
            <iframe
              title="FLAVORA Restaurant Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?q=40.758896,-73.985130&hl=en&z=15&output=embed"
              className="w-full h-full grayscale-[60%] invert-[90%] hue-rotate-180 opacity-90 contrast-125"
              loading="lazy"
            />
            {/* Map Pin Badge Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="flex flex-col items-center animate-bounce">
                <div className="bg-[#f76707] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl border-2 border-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>FLAVORA</span>
                </div>
                <div className="w-2 h-2 bg-[#f76707] rotate-45 -mt-1" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
