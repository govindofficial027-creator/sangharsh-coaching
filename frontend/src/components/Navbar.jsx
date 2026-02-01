import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_fd9f002f-2bb5-425d-9408-080228f6628f/artifacts/3sz8cx4v_IMG-20260201-WA0000.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3"
            data-testid="navbar-logo"
          >
            <img 
              src={LOGO_URL} 
              alt="Sangharsh Classes Logo" 
              className="h-12 w-12 rounded-full object-cover border-2 border-sangharsh-blue"
            />
            <div className="hidden sm:block">
              <h1 className="font-outfit text-xl font-bold text-sangharsh-blue">Sangharsh Classes</h1>
              <p className="text-xs text-slate-500">Building Strong Foundations</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-700 hover:text-sangharsh-blue font-medium transition-colors text-sm"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:9262647420" className="flex items-center gap-2 text-sangharsh-green font-medium">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">9262647420</span>
            </a>
            <Button 
              data-testid="navbar-cta"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-sangharsh-blue hover:bg-sangharsh-blue/90 text-white"
            >
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          data-testid="mobile-menu"
          className="lg:hidden bg-white border-t shadow-lg"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-2 text-slate-700 hover:text-sangharsh-blue font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t">
              <a 
                href="tel:9262647420" 
                className="flex items-center gap-2 text-sangharsh-green font-medium py-2"
              >
                <Phone className="w-4 h-4" />
                Call: 9262647420
              </a>
              <Button 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full mt-2 bg-sangharsh-blue hover:bg-sangharsh-blue/90 text-white"
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
