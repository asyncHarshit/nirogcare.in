import React, { useState } from 'react'
import { User, Phone, Stethoscope, ChevronRight, ArrowLeft } from 'lucide-react'

const DrPatientsListByHospital = ({ data = [] }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const backToDoctors = () => {
    setSelectedDoctor(null)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Doctors View */}
        {!selectedDoctor && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                Medical Directory
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Doctors Grid */}
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
                  <Stethoscope className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-gray-500 text-lg">No doctors available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((doctor) => (
                  <div
                    key={doctor.doctorId}
                    onClick={() => selectDoctor(doctor)}
                    className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10"
                  >
                    {/* Card Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Stethoscope className="h-8 w-8 text-white" />
                      </div>

                      {/* Doctor Info */}
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {doctor.specialization}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {doctor.patients?.length || 0} patient{doctor.patients?.length !== 1 ? 's' : ''} assigned
                        </p>
                      </div>

                      {/* Doctor ID */}
                      <div className="bg-gray-800/50 rounded-lg p-3 mb-6">
                        <p className="text-gray-500 text-xs mb-1">Doctor ID</p>
                        <p className="text-gray-300 font-mono text-xs break-all">
                          {doctor.doctorId}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">View patients</span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Patients View */}
        {selectedDoctor && (
          <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-8">
              <button
                onClick={backToDoctors}
                className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Doctors</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {selectedDoctor.specialization}
                  </h1>
                  <p className="text-gray-400">
                    {selectedDoctor.patients?.length || 0} patient{selectedDoctor.patients?.length !== 1 ? 's' : ''} assigned
                  </p>
                </div>
              </div>
            </div>

            {/* Patients List */}
            <div className="p-8">
              {selectedDoctor.patients && selectedDoctor.patients.length > 0 ? (
                <div className="grid gap-4 max-w-4xl">
                  {selectedDoctor.patients.map((patient, index) => (
                    <div
                      key={patient._id}
                      className="group bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                    >
                      <div className="flex items-center space-x-6">
                        {/* Patient Avatar */}
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all">
                          <User className="h-7 w-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
                        </div>

                        {/* Patient Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {patient.name}
                          </h3>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-300">{patient.phone}</span>
                          </div>

                          {/* IDs */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800/30 rounded-lg p-3">
                              <p className="text-gray-500 text-xs mb-1">Patient ID</p>
                              <p className="text-gray-400 font-mono text-xs break-all">
                                {patient._id}
                              </p>
                            </div>
                            <div className="bg-gray-800/30 rounded-lg p-3">
                              <p className="text-gray-500 text-xs mb-1">User ID</p>
                              <p className="text-gray-400 font-mono text-xs break-all">
                                {patient.userId}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-lg">No patients assigned</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DrPatientsListByHospital