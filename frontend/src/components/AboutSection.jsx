import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Award, Lightbulb } from 'lucide-react';

const ABOUT_IMAGE = "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?w=600&h=450&fit=crop";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Result Oriented",
      description: "Focused teaching methodology that delivers consistent results year after year."
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Individual attention to every student with personalized learning paths."
    },
    {
      icon: Award,
      title: "Experienced Faculty",
      description: "Learn from qualified teachers with decades of teaching experience."
    },
    {
      icon: Lightbulb,
      title: "Concept Building",
      description: "Strong focus on building fundamentals for long-term success."
    }
  ];

  return (
    <section 
      id="about" 
      data-testid="about-section"
      className="py-16 md:py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full bg-sangharsh-blue/10 rounded-2xl"></div>
            <img 
              src={ABOUT_IMAGE} 
              alt="Students studying at Sangharsh Classes" 
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-sangharsh-green text-white px-6 py-4 rounded-xl shadow-lg z-20">
              <p className="font-outfit text-3xl font-bold">10+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sangharsh-blue font-semibold text-sm uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Welcome to <span className="text-sangharsh-blue">Sangharsh Classes</span>
            </h2>
            <p className="text-slate-600 mb-6 text-base leading-relaxed">
              Sangharsh Classes has been a trusted name in quality education for over a decade. 
              We believe that every student has the potential to achieve greatness with the right 
              guidance and support.
            </p>
            <p className="text-slate-600 mb-8 text-base leading-relaxed">
              Our teaching approach combines traditional fundamentals with modern techniques, 
              ensuring students not only score well in exams but also develop a genuine understanding 
              of concepts. We prepare students for Class 9-12 board exams, JEE, NEET, and other 
              competitive examinations.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-sangharsh-blue/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-sangharsh-blue" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-semibold text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
