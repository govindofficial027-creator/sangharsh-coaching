import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Trophy } from 'lucide-react';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section 
      id="testimonials" 
      data-testid="testimonials-section"
      className="py-16 md:py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sangharsh-green font-semibold text-sm uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from our students who achieved their academic goals with Sangharsh Classes
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`testimonial-card-${index}`}
              className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-sangharsh-blue rounded-full flex items-center justify-center shadow-md">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 ml-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-sangharsh-yellow text-sangharsh-yellow" />
                ))}
              </div>

              {/* Message */}
              <p className="text-slate-600 text-base mb-6 leading-relaxed">
                "{testimonial.message}"
              </p>

              {/* Achievement Badge */}
              <div className="flex items-center gap-2 bg-sangharsh-green/10 text-sangharsh-green px-3 py-2 rounded-lg mb-4 inline-flex">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">{testimonial.achievement}</span>
              </div>

              {/* Student Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-gradient-to-br from-sangharsh-blue to-sangharsh-green rounded-full flex items-center justify-center text-white font-outfit font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-outfit font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.student_class}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            Join the success stories of Sangharsh Classes
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sangharsh-blue font-semibold hover:underline"
          >
            Start Your Journey Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
