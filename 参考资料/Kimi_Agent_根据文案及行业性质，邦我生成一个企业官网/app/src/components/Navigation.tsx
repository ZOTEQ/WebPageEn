import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/92 backdrop-blur-xl shadow-sm border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="content-max-width section-padding">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`font-display text-2xl font-semibold tracking-tight ${
              scrolled || !isHome ? 'text-zoteq-text' : 'text-white'
            }`}>
              ZOTEQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-zoteq-accent'
                    : scrolled || !isHome
                    ? 'text-zoteq-text hover:text-zoteq-accent'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-pill text-sm ${
              scrolled || !isHome
                ? 'bg-black/5 text-zoteq-text-secondary'
                : 'bg-white/10 text-white/70'
            }`}>
              <Search size={16} />
              <span className="text-sm">Search ingredients...</span>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-zoteq-accent text-white rounded-pill text-sm font-medium hover:bg-zoteq-accent-light transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${scrolled || !isHome ? 'text-zoteq-text' : 'text-white'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/5 shadow-lg">
          <div className="section-padding py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${
                  location.pathname === link.path ? 'text-zoteq-accent' : 'text-zoteq-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 px-5 py-3 bg-zoteq-accent text-white rounded-pill text-center font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
