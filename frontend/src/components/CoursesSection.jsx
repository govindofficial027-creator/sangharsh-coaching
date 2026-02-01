import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { BookOpen, Clock, Users, CheckCircle } from 'lucide-react';

const CoursesSection = ({ courses }) => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getColorClass = (index) => {
    const colors = ['border-t-sangharsh-blue', 'border-t-sangharsh-green', 'border-t-[#facc15]'];
    return colors[index % 3];
  };

  const renderSubjects = (subjects) => {
    return subjects.map((subject, idx) => (
      <span 
        key={idx}
        className="text-xs bg-sangharsh-green/10 text-sangharsh-green px-2 py-1 rounded"
      >
        {subject}
      </span>
    ));
  };

  const renderHighlights = (highlights) => {
    const displayHighlights = highlights.slice(0, 3);
    return displayHighlights.map((highlight, idx) => (
      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
        <CheckCircle className="w-4 h-4 text-sangharsh-green flex-shrink-0" />
        {highlight}
      </li>
    ));
  };

  return (
    <section 
      id="courses" 
      data-testid="courses-section"
      className="py-16 md:py-24 bg-white"
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
          <span className="inline-block text-sangharsh-blue font-semibold text-sm uppercase tracking-wider mb-4">
            Our Programs
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Courses We Offer
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive coaching programs designed to help students excel in academics and competitive exams
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`course-card-${index}`}
              className={`course-card bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 ${getColorClass(index)}`}
            >
              <div className="p-6">
                {/* Course Icon */}
                <div className="w-12 h-12 bg-sangharsh-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-sangharsh-blue" />
                </div>

                {/* Course Title */}
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    <Users className="w-3 h-3" />
                    {course.target}
                  </span>
                </div>

                {/* Subjects */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {renderSubjects(course.subjects)}
                  </div>
                </div>

                {/* Highlights */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Highlights:</p>
                  <ul className="space-y-1">
                    {renderHighlights(course.highlights)}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Button
                  onClick={scrollToContact}
                  className="w-full bg-sangharsh-blue hover:bg-sangharsh-blue/90 text-white"
                  data-testid={`course-enroll-btn-${index}`}
                >
                  Enquire Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
