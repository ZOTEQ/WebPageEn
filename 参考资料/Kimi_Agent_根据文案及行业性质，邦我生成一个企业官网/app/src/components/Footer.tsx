import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '@/data/offices';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-zoteq-bg-dark text-white">
      <div className="content-max-width section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-semibold text-white">ZOTEQ</span>
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Flavor & Fragrance Specialist<br />
              Nature meets science — creating the essence of tomorrow.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-zoteq-accent mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-zoteq-accent mt-0.5 flex-shrink-0" />
                <a href={`tel:${contactInfo.mobile}`} className="text-white/60 hover:text-white transition-colors text-sm">
                  {contactInfo.mobile}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-zoteq-accent mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Room 1602, Unit 2, No. 6 Linshijia,<br />
                  Lincui Road, Beijing, 100101
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} ZOTEQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
