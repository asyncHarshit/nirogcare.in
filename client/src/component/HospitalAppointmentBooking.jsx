import React, { useState } from 'react';
import { MapPin, Clock, Phone, Star, Calendar, User, FileText, ChevronLeft,Compass} from 'lucide-react';
import { logoutUser } from '../services/logoutService';

const HospitalAppointmentBooking = ({ hospitals = [] }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingData, setBookingData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
 

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBackToList = () => {
    setSelectedHospital(null);
    setBookingData({
      doctor: '',
      date: '',
      time: '',
      reason: '',
      notes: ''
    });

  };



  

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookAppointment = async () => {
    try {
      // Validate form
      if (!bookingData.doctor || !bookingData.date || !bookingData.time || !bookingData.reason) {
        alert('Please fill in all required fields');
        return;
      }

      // Here you would typically send the booking data to your API
      const appointmentData = {
        hospitalId: selectedHospital.id,
        hospitalName: selectedHospital.name,
        ...bookingData
      };

      console.log('Booking appointment:', appointmentData);
      
      // Mock success response
      alert('Appointment booked successfully!');
      
      // Reset form
      setBookingData({
        doctor: '',
        date: '',
        time: '',
        reason: '',
        notes: ''
      });
      
      // Optionally go back to hospital list
      handleBackToList();
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  // Show message if no hospitals provided
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Hospitals Available</h2>
          <p className="text-gray-300">Please provide hospitals data to display the list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {!selectedHospital ? (
          // Hospital List View
          <div className="space-y-8">
  {/* Header Section */}
  <div className="text-center mb-12">
    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent mb-4">
      Nearby Hospitals
    </h1>
    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
      Select a hospital to book an appointment and receive quality healthcare
    </p>
    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mx-auto mt-4" />
  </div>
  
  {/* Hospital Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {hospitals.map((hospital) => (
      <div
        key={hospital.id}
        className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-gray-900/80 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10"
        onClick={() => handleHospitalSelect(hospital)}
      >
        {/* <div className="aspect-video bg-gray-700/50 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={hospital.image} 
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div> */}
        {/* Gradient overlay for premium effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Hospital name with premium styling */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-50 transition-colors duration-300">
              {hospital.name}
            </h3>
            {/* <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:w-20" /> */}
          </div>

          {/* Info items with enhanced styling */}
          <div className="space-y-4 mb-6">
            {/* Address */}
            <div className="flex items-start text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-500/20 transition-all duration-300">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-medium leading-relaxed">{hospital.address}</p>
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all duration-300">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-medium">
                  {(hospital.distance/1000).toFixed(2)} km away
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-all duration-300">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-medium">{hospital.phone}</p>
              </div>
            </div>

            {/* Rating */}
            {/* <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-500/20 transition-all duration-300">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-sm font-semibold text-white">{hospital.rating}</p>
              </div>
            </div> */}
          </div>
          
          {/* Specialties */}
          {hospital.specialties && hospital.specialties.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20 group-hover:border-emerald-400/30 transition-all duration-300"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

        
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      </div>
    ))}
  </div>
</div>
        ) : (
          // Appointment Booking Form
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToList}
                className="flex items-center text-gray-300 hover:text-white  mr-4"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Hospitals
              </button>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center mb-6">
                {/* <div className="w-16 h-16 bg-gray-700/50 rounded-lg overflow-hidden mr-4">
                  <img 
                    src={selectedHospital.image} 
                    alt={selectedHospital.name}
                    className="w-full h-full object-cover"
                  />
                </div> */}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedHospital.name}</h2>
                  <p className="text-gray-300">{selectedHospital.address}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6">Book an Appointment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Select Doctor *
                  </label>
                  <select 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                    value={bookingData.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                  >
                    <option value="">Choose a doctor...</option>
                    <option value="Dr. Sarah Johnson - Cardiology">Dr. Sarah Johnson - Cardiology</option>
                    <option value="Dr. Michael Chen - Dermatology">Dr. Michael Chen - Dermatology</option>
                    <option value="Dr. Emily Davis - Orthopedics">Dr. Emily Davis - Orthopedics</option>
                    <option value="Dr. Robert Wilson - Neurology">Dr. Robert Wilson - Neurology</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Date *
                  </label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Preferred Time *
                  </label>
                  <select 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  >
                    <option value="">Select time...</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Reason for Visit *
                  </label>
                  <select 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none"
                    value={bookingData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                  >
                    <option value="">Select reason...</option>
                    <option value="Routine Checkup">Routine Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-300 mb-2">Additional Notes</label>
                <textarea 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-green-500 focus:outline-none" 
                  rows="3" 
                  placeholder="Any additional information..."
                  value={bookingData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleBookAppointment}
                  className="bg-gradient-to-r from-green-500 to-blue-500 font-bold px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </button>
                <button 
                  onClick={handleBackToList}
                  className="bg-gray-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalAppointmentBooking;