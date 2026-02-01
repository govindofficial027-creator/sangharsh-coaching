import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_fd9f002f-2bb5-425d-9408-080228f6628f/artifacts/3sz8cx4v_IMG-20260201-WA0000.jpg";
const HERO_BG = "https://images.unsplash.com/photo-1758685734622-3e0a002b2f53?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85";

const HeroSection = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: '1000+', label: 'Students' },
    { icon: Trophy, value: '95%', label: 'Success Rate' },
    { icon: GraduationCap, value: '10+', label: 'Years Experience' },
    { icon: BookOpen, value: '15+', label: 'Expert Faculty' },
  ];

  return (
    <section 
      id="home" 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-20"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sangharsh-blue/10 text-sangharsh-blue px-4 py-2 rounded-full mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted Coaching Institute</span>
            </div>

            {/* Logo for mobile */}
            <div className="lg:hidden mb-6">
              <img 
                src={LOGO_URL} 
                alt="Sangharsh Classes" 
                className="w-24 h-24 rounded-full border-4 border-sangharsh-blue shadow-lg"
              />
            </div>

            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              <span className="text-sangharsh-blue">Sangharsh</span> Classes
            </h1>
            
            <p className="text-lg sm:text-xl text-sangharsh-green font-semibold mb-4">
              "Building Strong Foundations for a Successful Future"
            </p>
            
            <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-xl">
              Join the best coaching institute for Class 9-12, Board Exams, JEE, and NEET preparation. 
              Expert faculty, proven results, and personalized attention for every student.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                data-testid="hero-enroll-btn"
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="bg-sangharsh-blue hover:bg-sangharsh-blue/90 text-white h-12 px-8 text-base"
              >
                Enroll Now - Free Demo
              </Button>
              <Button
                data-testid="hero-courses-btn"
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#courses')}
                className="border-2 border-sangharsh-green text-sangharsh-green hover:bg-sangharsh-green/5 h-12 px-8 text-base"
              >
                View Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100"
                >
                  <stat.icon className="w-6 h-6 text-sangharsh-blue mx-auto mb-2" />
                  <p className="font-outfit text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Logo Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-sangharsh-blue/20 rounded-full blur-3xl transform scale-110"></div>
              <img 
                src={LOGO_URL} 
                alt="Sangharsh Classes Logo" 
                className="relative z-10 w-64 h-64 xl:w-80 xl:h-80 rounded-full object-cover border-8 border-white shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
