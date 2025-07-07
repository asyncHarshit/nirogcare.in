// components/LabAppointmentBooking.jsx
import React, { useState } from 'react';
import { MapPin, Clock, Phone, Calendar, ChevronLeft, FileText ,Compass} from 'lucide-react';

const LabAppointmentBooking = ({ labs = [] }) => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [formData, setFormData] = useState({
    testType: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleLabSelect = (lab) => setSelectedLab(lab);
  const handleBack = () => {
    setSelectedLab(null);
    setFormData({ testType: '', date: '', time: '', notes: '' });
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookTest = () => {
    if (!formData.testType || !formData.date || !formData.time) {
      alert('Please fill all required fields');
      return;
    }

    console.log({
      labId: selectedLab._id,
      labName: selectedLab.name,
      ...formData
    });

    alert('Lab test booked successfully!');
    handleBack();
  };

  if (!labs || labs.length === 0) {
    return <p className="text-white text-center mt-8">No Labs Available</p>;
  }

  return (
    <div>
       
  {!selectedLab ? (
    <>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent mb-4">
          Nearby Labs
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Select a lab for checkups
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {labs.map((lab) => (
          <div
            key={lab._id}
            className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border  border-gray-700/30 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-gray-900/80 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10"
            onClick={() => handleLabSelect(lab)}
          >
            {/* Gradient overlay for premium effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
              {/* Lab name with premium styling */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-50 transition-colors duration-300">
                  {lab.name}
                </h3>
              </div>

              {/* Info items with enhanced styling */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-medium leading-relaxed">{lab.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-all duration-300">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-medium">{lab.phone}</p>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all duration-300">
                    <Compass className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-medium">
                      {(lab.distance/1000).toFixed(2)} km away
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-blue-500/0 opacity-0 group-hover:opacity-200 transition-opacity duration-500 blur-2xl" />

            {/* Book button at the bottom */}
            {/* <div className="mt-8 flex justify-items-end justify-baseline">
              <div className="w-full">
                <div className="bg-gradient-to-r from-green-700 to-blue-700 font-bold text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 text-center">
                  Book
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </>
  
      ) : (
        <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
          <button onClick={handleBack} className="flex items-center text-gray-300 hover:text-white mb-6">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back to Labs
          </button>

          <h2 className="text-2xl text-white font-bold mb-4">{selectedLab.name}</h2>
          <p className="text-gray-400 mb-6">{selectedLab.address}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Select Test *
              </label>
              <select
                value={formData.testType}
                onChange={(e) => handleInputChange('testType', e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white"
              >
                <option value="">Choose a test...</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Urine Test">Urine Test</option>
                <option value="Thyroid Panel">Thyroid Panel</option>
                <option value="Liver Function">Liver Function</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Preferred Date *
              </label>
              <input
                type="date"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Preferred Time *
              </label>
              <select
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white"
              >
                <option value="">Choose time...</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white"
              rows="3"
            />
          </div>

          <button
            onClick={handleBookTest}
            className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600"
          >
            Book Lab Test
          </button>
        </div>
      )}
    </div>
  );
};

export  {LabAppointmentBooking}
