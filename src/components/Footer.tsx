import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: 'collection' | 'about' | 'contact' | 'craftsmanship') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-12">
      {/* Subtle Red Accent Line */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="h-[1.5px] w-full bg-gradient-to-r from-red-700/0 via-red-700/60 to-red-700/0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-100">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-[0.15em] uppercase font-normal">
              CROWN JEWEL WATCHES
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm font-light leading-relaxed">
              A curated collection of exceptional timepieces defined by precision, craftsmanship, and timeless design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-neutral-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-red-700 transition-colors cursor-pointer"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-red-700 transition-colors cursor-pointer"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-red-700 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-red-700 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-neutral-900">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-neutral-600">
              <a
                href="mailto:crownjewelwatches@outlook.com"
                className="flex items-center gap-2 hover:text-red-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-red-700" />
                <span>crownjewelwatches@outlook.com</span>
              </a>
              <a
                href="tel:+12133754470"
                className="flex items-center gap-2 hover:text-red-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-700" />
                <span>+1 213-375-4470</span>
              </a>
            </div>
            <p className="text-[11px] text-neutral-600 pt-2 font-light">
              Client consultations available by phone and private appointment.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600 font-light">
          <div>
            © {new Date().getFullYear()} Crown Jewel Watches. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Mechanical Precision</span>
            <span className="text-red-700">·</span>
            <span>Hand-Regulated Timepieces</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
