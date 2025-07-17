import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Calendar, 
  TestTube, 
  Stethoscope, 
  Activity,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const HealthcareLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  const features = [
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      description: 'Schedule appointments with doctors and labs seamlessly',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Queue Management',
      description: 'Efficiently manage patient flow and reduce wait times',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TestTube,
      title: 'Lab Test Management',
      description: 'Book lab tests and track results in real-time',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Secure Health Records',
      description: 'Your medical data is encrypted and protected',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Track your health metrics and get insights',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Family Management',
      description: 'Manage health records for your entire family',
      color: 'from-rose-500 to-purple-500'
    },
  ];

  const testimonials = [
    {
      name: 'Shubham Singh',
      role: 'Patient',
      content: 'NirogCare has transformed how I manage my healthcare. Booking appointments is now effortless!',
      rating: 5
    },
    {
      name: 'Dr. Harshit Singh',
      role: 'Cardiologist',
      content: 'The platform streamlines patient management and improves communication significantly.',
      rating: 5
    },
    {
      name: 'Anjali Verma',
      role: 'Family User',
      content: 'Managing my family\'s health records has never been easier. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20 group-hover:border-emerald-400/30 transition-all duration-300 group-hover:scale-105">
                  <Stethoscope className="text-emerald-300 w-7 h-7 group-hover:text-emerald-200 transition-colors duration-300" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-50 to-emerald-100 bg-clip-text text-transparent group-hover:from-emerald-200 group-hover:to-blue-200 transition-all duration-300">
                  NirogCare
                </h1> 
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            <button 
              onClick={handleGetStarted}
              className="text-black cursor-pointer bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            >
             Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-green-900/10"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 text-emerald-200 text-sm font-medium">
              <Stethoscope className="w-4 h-4 mr-2 text-cyan-400" />
              Advanced Healthcare Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Your Health,
            <span className="block bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience seamless healthcare management with our comprehensive platform. 
            Book appointments, manage lab tests, and track your health journey all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleGetStarted}
              className="group cursor-pointer bg-gradient-to-r from-emerald-500 to-green-500 opacity-80 hover:opacity-100 hover:from-emerald-600 hover:to-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-black duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 flex items-center"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 cursor-pointer py-4 rounded-xl font-semibold text-lg border-2 border-gray-600 hover:border-gray-400 transition-all duration-300 hover:bg-gray-800/50">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm">Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm">Labs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-emerald-500">
              Why Choose NirogCare?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the features that make healthcare management effortless and efficient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-2xl border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-500">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real stories from real people who trust NirogCare with their healthcare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 p-8 rounded-2xl border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-3xl p-12 border border-emerald-500/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have revolutionized their healthcare management with NirogCare
            </p>
            <button 
              onClick={handleGetStarted}
              className="group cursor-pointer text-black bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 flex items-center mx-auto"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-3 mb-4 group">
                <div className="p-2 flex items-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20 group-hover:border-emerald-400/30 transition-all duration-300 group-hover:scale-105">
                  <Stethoscope className="text-emerald-300 w-7 h-7 group-hover:text-emerald-200 transition-colors duration-300" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-50 to-emerald-100 bg-clip-text text-transparent group-hover:from-emerald-200 group-hover:to-blue-200 transition-all duration-300">
                  NirogCare
                </h1> 
              </div>
          <p className="text-gray-400 font">
            Made with <span>❤️</span> by HomoSapiens
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareLandingPage;