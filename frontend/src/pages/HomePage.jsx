import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import FacultySection from '../components/FacultySection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize gallery first
        await axios.post(`${API}/gallery/init`);
        
        const [coursesRes, facultyRes, testimonialsRes, galleryRes] = await Promise.all([
          axios.get(`${API}/courses`),
          axios.get(`${API}/faculty`),
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/gallery`)
        ]);
        
        setCourses(coursesRes.data);
        setFaculty(facultyRes.data);
        setTestimonials(testimonialsRes.data);
        setGalleryImages(galleryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshGallery = async () => {
    try {
      const galleryRes = await axios.get(`${API}/gallery`);
      setGalleryImages(galleryRes.data);
    } catch (error) {
      console.error('Error refreshing gallery:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sangharsh-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Sangharsh Classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="home-page" className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CoursesSection courses={courses} />
      <FacultySection faculty={faculty} />
      <GallerySection images={galleryImages} onRefresh={refreshGallery} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
