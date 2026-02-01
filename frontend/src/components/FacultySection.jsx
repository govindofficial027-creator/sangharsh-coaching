import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const FacultySection = ({ faculty }) => {
  return (
    <section 
      id="faculty" 
      data-testid="faculty-section"
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
            Our Team
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Meet Our Expert Faculty
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Learn from experienced teachers who are dedicated to your academic success
          </p>
        </motion.div>
        
        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`faculty-card-${index}`}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={member.image_url} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                
                {/* Subject Badge */}
                <span className="inline-flex items-center gap-1 bg-sangharsh-blue/10 text-sangharsh-blue text-sm font-medium px-3 py-1 rounded-full mb-3">
                  <GraduationCap className="w-4 h-4" />
                  {member.subject}
                </span>

                {/* Qualification */}
                <p className="text-slate-600 text-sm mb-2">
                  {member.qualification}
                </p>

                {/* Experience */}
                <div className="flex items-center justify-center gap-2 text-sangharsh-green text-sm">
                  <Award className="w-4 h-4" />
                  {member.experience}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          * Faculty information can be updated by the institute administrator
        </motion.p>
      </div>
    </section>
  );
};

export default FacultySection;
