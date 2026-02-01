import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_fd9f002f-2bb5-425d-9408-080228f6628f/artifacts/3sz8cx4v_IMG-20260201-WA0000.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const courses = [
    'Class 9-10 Foundation',
    'Class 11-12 Science',
    'JEE Preparation',
    'NEET Preparation',
    'Board Exam Coaching',
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer data-testid="footer" className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={LOGO_URL} 
                alt="Sangharsh Classes" 
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h3 className="font-outfit text-xl font-bold">Sangharsh Classes</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Building Strong Foundations for a Successful Future. Trusted coaching for Class 9-12, 
              JEE, and NEET preparation.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-sangharsh-blue rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-sangharsh-blue rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 hover:bg-sangharsh-blue rounded-lg flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Our Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course}>
                  <span className="text-slate-400 text-sm">{course}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sangharsh-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <a href="tel:9262647420" className="text-white hover:text-sangharsh-green transition-colors">
                    9262647420
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sangharsh-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:sangharshclasses@gmail.com" className="text-white hover:text-sangharsh-green transition-colors text-sm break-all">
                    sangharshclasses@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sangharsh-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Address</p>
                  <p className="text-white text-sm">
                    Near Main Market, City Center<br />
                    Your City, State - 123456
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {currentYear} Sangharsh Classes. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Made with ❤️ for Indian Students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
