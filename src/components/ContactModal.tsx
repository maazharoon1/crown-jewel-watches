import React, { useState } from 'react';
import { X, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Timepiece Acquisition Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white shadow-2xl border border-neutral-200 p-8 sm:p-12 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Direct verified contact channels */}
          <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 pb-8 md:pb-0 md:pr-8">
            <div>
              <div className="w-8 h-[1.5px] bg-red-700 mb-6" />
              
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
                CONTACT
              </h2>

              <p className="mt-2 text-xs tracking-[0.2em] uppercase text-neutral-600 font-medium">
                Crown Jewel Watches
              </p>

              <p className="mt-6 text-xs text-neutral-600 leading-relaxed font-light">
                Our advisors are available for private consultations, timepiece acquisition inquiries, and worldwide insured dispatch arrangements.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:crownjewelwatches@outlook.com"
                  className="flex items-center gap-3 p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors text-xs text-neutral-800 group"
                >
                  <Mail className="w-4 h-4 text-red-700" />
                  <span className="truncate group-hover:text-red-700 transition-colors">
                    crownjewelwatches@outlook.com
                  </span>
                </a>

                <a
                  href="tel:+12133754470"
                  className="flex items-center gap-3 p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors text-xs text-neutral-800 group"
                >
                  <Phone className="w-4 h-4 text-red-700" />
                  <span className="group-hover:text-red-700 transition-colors">
                    +1 213-375-4470
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-neutral-500">
              Personalized responses provided within 24 hours.
            </div>
          </div>

          {/* Right Column: Elegant Contact Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="font-serif text-2xl text-neutral-900 font-normal">
                  Inquiry Dispatched
                </h3>
                <p className="mt-3 text-xs text-neutral-600 max-w-sm leading-relaxed">
                  Thank you for reaching out to Crown Jewel Watches. A specialist will review your request and get in touch with you directly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-6 px-6 py-2.5 text-xs tracking-[0.16em] uppercase font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xs tracking-[0.18em] uppercase font-semibold text-neutral-900 mb-2">
                  Send an Inquiry
                </h3>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1..."
                      className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option value="Timepiece Acquisition Inquiry">Timepiece Acquisition Inquiry</option>
                    <option value="Specific Reference Availability">Specific Reference Availability</option>
                    <option value="White-Glove Delivery Question">White-Glove Delivery Question</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-neutral-700 font-medium mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the timepiece or question you have in mind..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
