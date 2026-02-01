# Sangharsh Classes - Educational Coaching Website PRD

## Project Overview
Professional educational coaching institute website for Sangharsh Classes.

## Original Problem Statement
Create a professional educational coaching institute website with:
- Coaching Name: Sangharsh Classes
- Courses: Class 9-12, JEE, NEET preparation
- Main Subjects: Mathematics, Science, Physics, Chemistry
- Target: School students and competitive exam aspirants
- Bilingual: English + Hindi

## User Personas
1. **Students (Class 9-12)**: Looking for quality coaching for board exams
2. **Parents**: Seeking reliable coaching institute for their children
3. **Competitive Exam Aspirants**: JEE/NEET preparation students

## Core Requirements
- Home page with hero section and stats
- About Us section
- Courses section with detailed information
- Faculty/Teachers showcase
- Editable Photo Gallery (Admin feature)
- Student Testimonials
- Contact form with class selection
- WhatsApp floating button
- Mobile responsive design
- SEO-friendly structure

## What's Implemented (February 2026)

### Frontend Components
- ✅ Navbar with smooth scroll navigation
- ✅ Hero section with logo, tagline, stats (1000+ students, 95% success rate)
- ✅ About section with feature highlights
- ✅ Courses section with 3 programs (Class 9-10, 11-12, Competitive)
- ✅ Faculty section with 3 teachers (Math, Physics, Chemistry)
- ✅ Editable Gallery with admin upload via URL
- ✅ Testimonials section with student success stories
- ✅ Contact form with class selection dropdown
- ✅ Footer with contact details and quick links
- ✅ WhatsApp floating button (919262647420)

### Backend APIs
- ✅ GET /api/courses - Returns course list
- ✅ GET /api/faculty - Returns faculty list  
- ✅ GET /api/testimonials - Returns testimonials
- ✅ GET /api/gallery - Returns gallery images
- ✅ POST /api/gallery - Add new image (admin)
- ✅ DELETE /api/gallery/{id} - Delete image (admin)
- ✅ POST /api/contact - Submit contact form
- ✅ POST /api/gallery/init - Initialize default images

### Design
- Color scheme: Blue (#1e40af), Green (#15803d), White
- Typography: Outfit (headings), DM Sans (body)
- Modern minimal design
- Fully responsive (mobile-first)

## Prioritized Backlog

### P0 - Done
- [x] All core sections implemented
- [x] Gallery admin functionality
- [x] Contact form working
- [x] Mobile responsive

### P1 - Future Enhancements
- [ ] Admin authentication for gallery management
- [ ] Google Maps integration for address
- [ ] Student login portal
- [ ] Course fee display
- [ ] Online admission form

### P2 - Nice to Have
- [ ] Blog/News section
- [ ] Video testimonials
- [ ] Live chat integration
- [ ] Performance dashboard

## Contact Information
- Phone: 9262647420
- Email: sangharshclasses@gmail.com
- Tagline: "Building Strong Foundations for a Successful Future"

## Tech Stack
- Frontend: React 19, Tailwind CSS, Framer Motion
- Backend: FastAPI, MongoDB
- UI Components: Shadcn/UI
