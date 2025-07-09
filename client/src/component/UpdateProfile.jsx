import React, { useState } from 'react';
import { User, MapPin, Calendar, Users, Save, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';

import { updatePatient } from '../services/updateProfileService';
const UpdatePatientProfile = ({ userData = {} }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.age || !formData.gender || !formData.address) {
      setMessage('All fields are required.');
      setMessageType('error');
      return;
    }

    if (formData.age < 1 || formData.age > 150) {
      setMessage('Please enter a valid age between 1 and 150.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulate API call
       const result = await updatePatient(formData);
      console.log(result);
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (err) {
      setMessage(err.message || "An error occurred");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-black flex items-center justify-center ">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-7 border border-green-500/20 backdrop-blur-sm">
          
          {/* Header */}
        <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2 mb-1">
            <User className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-green-300 bg-clip-text text-transparent">
            Update Patient Profile
            </h2>
        </div>
        <p className="text-gray-400 mt-2">Complete your medical profile information</p>
    </div>


          {/* User Information Display */}
          <div className="relative bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-xl p-5 mb-4 border border-green-500/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl"></div>
            <h3 className="text-xl font-semibold text-cyan-500 mb-4 flex items-center">
              <div className="w-2 h-2 bg-cyan-300 rounded-full mr-3 animate-pulse"></div>
              User Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center group">
                <User className="w-5 h-5 text-green-400 mr-3 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm min-w-[60px]">Name:</span>
                <span className="text-white ml-2 font-medium">{userData?.user?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 text-green-400 mr-3 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm min-w-[60px]">Phone:</span>
                <span className="text-white ml-2 font-medium">{userData?.user?.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-5 h-5 text-green-400 mr-3 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm min-w-[60px]">Email:</span>
                <span className="text-white ml-2 font-medium">{userData?.user?.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`flex items-center p-4 mb-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
              messageType === 'success' 
                ? 'bg-green-900/30 text-green-200 border-green-500/50 shadow-green-500/20' 
                : 'bg-red-900/30 text-red-200 border-red-500/50 shadow-red-500/20'
            } shadow-lg`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-3 text-red-400" />
              )}
              {message}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Age Field */}
            <div className="group">
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                <Calendar className="w-4 h-4 mr-2 text-green-400" />
                Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="150"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all duration-300 hover:border-green-500/30 backdrop-blur-sm"
                  placeholder="Enter your age"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Gender Field */}
            <div className="group">
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                <Users className="w-4 h-4 mr-2 text-green-400" />
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white transition-all duration-300 hover:border-green-500/30 backdrop-blur-sm appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-gray-800">Select gender</option>
                  <option value="male" className="bg-gray-800">Male</option>
                  <option value="female" className="bg-gray-800">Female</option>
                  <option value="other" className="bg-gray-800">Other</option>
                  <option value="prefer-not-to-say" className="bg-gray-800">Prefer not to say</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Address Field */}
            <div className="group">
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2 group-hover:text-green-400 transition-colors">
                <MapPin className="w-4 h-4 mr-2 text-green-400" />
                Address
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-1 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 resize-none text-white placeholder-gray-400 transition-all duration-300 hover:border-green-500/30 backdrop-blur-sm"
                  placeholder="Enter your full address"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex items-center justify-center py-2 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                loading
                  ? 'bg-gray-600/50 cursor-not-allowed text-gray-400 border border-gray-600/50'
                  : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black border border-green-500/50 hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98]'
              } transform`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400 mr-3"></div>
                  Updating Profile...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-3" />
                  Update Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatientProfile;