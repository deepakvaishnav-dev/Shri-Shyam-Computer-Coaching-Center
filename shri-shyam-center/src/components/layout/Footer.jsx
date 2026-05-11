import { Link } from 'react-router-dom';
import { GraduationCap, Phone, MapPin, Mail } from 'lucide-react';

// Social icons as simple SVGs
function FbIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>; }
function TwIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>; }
function IgIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function YtIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95 29 29 0 00.46-5.33 29 29 0 00-.46-5.4z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>; }

export function Footer() {
  return (
    <footer className="bg-[#0D1453] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#FF6F00] flex items-center justify-center">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold font-heading text-base leading-tight">Shri Shyam</p>
                <p className="text-xs text-gray-400">Computer & Coaching Center</p>
              </div>
            </div>
            <p className="font-hindi text-sm text-gray-400 mb-3">
              श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering Rural Rajasthan with Quality Education & Technology since 2010.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: FbIcon, href: '#' },
                { Icon: TwIcon, href: '#' },
                { Icon: IgIcon, href: '#' },
                { Icon: YtIcon, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#FF6F00] transition-colors duration-200"
                >
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/courses', label: 'Our Courses' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/login', label: 'Student Login' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-[#FF6F00] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F00] shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Our Courses</h4>
            <ul className="space-y-3">
              {[
                'RS-CIT (Govt. Certified)',
                'Class 1–12 Coaching',
                'NIOS 10th & 12th',
                'Web Development',
                'Generative AI',
                'English Spoken',
              ].map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F00] shrink-0" />
                  <span className="text-sm text-gray-400">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#FF6F00] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Sadar Bazar, Nagola, Teh. Bhinay, Ajmer, Rajasthan
                </p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-[#FF6F00] shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>9950669970</p>
                  <p>8619494994</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-[#FF6F00] shrink-0" />
                <a href="mailto:admin@shrishyam.com" className="text-sm text-gray-400 hover:text-[#FF6F00] transition-colors">
                  admin@shrishyam.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Shri Shyam Computer & Coaching Center. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block animate-pulse" />
            RS-CIT | NIOS Board | Govt. Recognized
          </div>
        </div>
      </div>
    </footer>
  );
}
