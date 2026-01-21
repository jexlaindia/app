import React, { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Add scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-white h-full shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-6 bg-white rounded-full"></div>
                    <div className="w-1.5 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">JEXLA Group</h2>
                  <p className="text-sm text-gray-600">Excellence & Automation</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMenuOpen(false)}
                data-testid="close-menu-btn"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-6">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About us' },
                  { id: 'promoters', label: 'Promoters' },
                  { id: 'sectors', label: 'Sectors' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      data-testid={`nav-${item.id}-btn`}
                      className="text-lg text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Sign In Button */}
              <Button 
                className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl transition-colors duration-200"
                data-testid="sign-in-btn"
              >
                Sign In
              </Button>
              
              {/* Welcome Message */}
              <div className="mt-6 p-4 bg-teal-50 rounded-xl text-center">
                <p className="text-teal-800 font-medium">Welcome to JEXLA</p>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-6 bg-white rounded-full"></div>
                  <div className="w-1.5 h-6 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JEXLA Group</h1>
                <p className="text-xs text-gray-600">Excellence & Automation</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(true)}
              data-testid="menu-btn"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="fade-in-section">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                JEXLA Group
              </h1>
              <p className="text-lg sm:text-xl text-teal-600 font-semibold mb-6">
                Jagtap Ecosystem Excellence And Lives Automation
              </p>
              <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Where Innovation Meets Purpose, driving sustainable solutions that transform industries 
                and enhance lives through cutting-edge automation and ecosystem excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => scrollToSection('about')}
                  data-testid="explore-approach-btn"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2"
                >
                  Explore Our Approach
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollToSection('sectors')}
                  data-testid="read-more-btn"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="bg-teal-600 py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '4+', label: 'Years Experience', icon: '🏆' },
                { number: '100%', label: 'Committed', icon: '💎' },
                { number: 'Global', label: 'Reach', icon: '🌍' },
                { number: '24/7', label: 'Support', icon: '🚀' }
              ].map((metric, index) => (
                <div key={index} className="text-center fade-in-section" data-testid={`metric-${index}`}>
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.number}</div>
                  <div className="text-teal-100 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Our Promoters */}
        <section id="promoters" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="fade-in-section">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">About Our Promoters</h2>
              <p className="text-teal-600 text-center mb-12 font-medium">Our Founder</p>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <div className="text-2xl">👨‍💼</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Mr Mayur J's</h3>
                      <p className="text-teal-600 font-medium">Founder & CEO</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    A visionary leader with extensive experience in ecosystem development and automation technologies. 
                    Mr. Mayur J's brings innovative solutions that bridge the gap between traditional business practices 
                    and modern technological advancement, ensuring sustainable growth and operational excellence across 
                    diverse industry sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diverse Business Sectors */}
        <section id="sectors" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="fade-in-section">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Diverse Business Sectors</h2>
              <p className="text-teal-600 text-center mb-12 font-medium">Our Sectors</p>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                JEXLA Group operates across multiple industry verticals, delivering specialized solutions 
                that drive innovation and sustainable growth in each sector we serve.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Manufacturing Industry',
                    description: 'Advanced automation solutions for modern manufacturing processes.',
                    icon: '🏭'
                  },
                  {
                    title: 'JEXLA Service',
                    description: 'Comprehensive ecosystem services tailored to client needs.',
                    icon: '⚙️'
                  },
                  {
                    title: 'Sustainable Solutions',
                    description: 'Environment-friendly innovations for a greener future.',
                    icon: '🌱'
                  },
                  {
                    title: 'Export-Import Services',
                    description: 'Global trade facilitation and logistics management.',
                    icon: '📦'
                  }
                ].map((sector, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                    data-testid={`sector-card-${index}`}
                  >
                    <div className="text-4xl mb-4 text-center">{sector.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{sector.title}</h3>
                    <p className="text-gray-600 text-sm text-center leading-relaxed">{sector.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Get In Touch */}
        <section id="contact" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="fade-in-section">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get In Touch</h2>
              
              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: 'Email Us',
                    info: 'contact@jexlagroup.com',
                    icon: <Mail className="w-6 h-6" />
                  },
                  {
                    title: 'Call Us',
                    info: '+91 98765 43210',
                    icon: <Phone className="w-6 h-6" />
                  },
                  {
                    title: 'Visit Us',
                    info: 'Mumbai, Maharashtra, India',
                    icon: <MapPin className="w-6 h-6" />
                  }
                ].map((contact, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                    data-testid={`contact-card-${index}`}
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                      {contact.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{contact.title}</h3>
                    <p className="text-gray-600">{contact.info}</p>
                  </div>
                ))}
              </div>
              
              {/* Contact Form */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      data-testid="contact-name-input"
                      className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      data-testid="contact-email-input"
                      className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      data-testid="contact-phone-input"
                      className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      data-testid="contact-message-input"
                      className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="send-message-btn"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-6 bg-white rounded-full"></div>
                      <div className="w-1.5 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">JEXLA Group</h3>
                    <p className="text-sm text-gray-400">Excellence & Automation</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Driving innovation and sustainable growth through cutting-edge automation 
                  and ecosystem excellence across diverse industry sectors.
                </p>
                <div className="flex space-x-4 mt-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                    <button 
                      key={index}
                      data-testid={`social-${index}-btn`}
                      className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {['Home', 'About Us', 'Promoters', 'Sectors', 'Contact'].map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                        data-testid={`footer-${link.toLowerCase().replace(' ', '-')}-btn`}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Our Sectors */}
              <div>
                <h4 className="text-lg font-bold mb-4">Our Sectors</h4>
                <ul className="space-y-2">
                  {['Manufacturing Industry', 'JEXLA Service', 'Sustainable Solutions', 'Export-Import Services'].map((sector, index) => (
                    <li key={index}>
                      <span className="text-gray-400">{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 JEXLA Group. All rights reserved. Excellence & Automation.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;