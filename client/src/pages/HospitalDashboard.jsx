import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FlaskConical, 
  UserCheck, 
  UserPlus, 
  LogOut, 
  User, 
  Bell,
  Activity,
  Bed,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Plus,
  Heart,
  Stethoscope,
  Building
} from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(5);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'patients', label: 'Todays Patients', icon: Users },
    { id: 'lab', label: 'Lab Collection', icon: FlaskConical },
    { id: 'doctors', label: 'Doctor Collection', icon: UserCheck },
    { id: 'assistants', label: 'Assistant Collection', icon: UserPlus },
  ];

  const hospitalStats = [
    { icon: Users, label: 'Total Patients', value: '324', change: '+12%', color: 'text-blue-400' },
    { icon: Bed, label: 'Occupied Beds', value: '156/200', change: '78%', color: 'text-green-400' },
    { icon: UserCheck, label: 'Doctors on Duty', value: '24', change: '+2', color: 'text-purple-400' },
    { icon: Activity, label: 'Emergency Cases', value: '8', change: '+3', color: 'text-red-400' },
  ];

  const todaysPatients = [
    { id: 'P001', name: 'John Smith', age: 45, condition: 'Cardiac Checkup', doctor: 'Dr. Johnson', time: '09:00 AM', status: 'Waiting' },
    { id: 'P002', name: 'Mary Wilson', age: 62, condition: 'Diabetes Follow-up', doctor: 'Dr. Brown', time: '09:30 AM', status: 'In Progress' },
    { id: 'P003', name: 'Robert Davis', age: 38, condition: 'Orthopedic Consultation', doctor: 'Dr. Miller', time: '10:00 AM', status: 'Completed' },
    { id: 'P004', name: 'Lisa Anderson', age: 29, condition: 'Prenatal Checkup', doctor: 'Dr. Garcia', time: '10:30 AM', status: 'Waiting' },
  ];

  const labCollection = [
    { id: 'L001', patient: 'John Smith', test: 'Complete Blood Count', status: 'Collected', time: '08:30 AM' },
    { id: 'L002', patient: 'Mary Wilson', test: 'Glucose Test', status: 'Pending', time: '09:15 AM' },
    { id: 'L003', patient: 'Robert Davis', test: 'X-Ray Knee', status: 'Completed', time: '09:45 AM' },
    { id: 'L004', patient: 'Lisa Anderson', test: 'Ultrasound', status: 'In Progress', time: '10:00 AM' },
  ];

  const doctorCollection = [
    { id: 'D001', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 12, status: 'Available', shift: 'Morning' },
    { id: 'D002', name: 'Dr. Michael Brown', specialty: 'Endocrinology', patients: 8, status: 'Busy', shift: 'Morning' },
    { id: 'D003', name: 'Dr. Emily Miller', specialty: 'Orthopedics', patients: 15, status: 'Available', shift: 'Afternoon' },
    { id: 'D004', name: 'Dr. Carlos Garcia', specialty: 'Gynecology', patients: 10, status: 'In Surgery', shift: 'Full Day' },
  ];

  const assistantCollection = [
    { id: 'A001', name: 'Jennifer Lee', role: 'Head Nurse', department: 'ICU', shift: 'Night', status: 'On Duty' },
    { id: 'A002', name: 'Mark Thompson', role: 'Lab Technician', department: 'Laboratory', shift: 'Morning', status: 'Available' },
    { id: 'A003', name: 'Patricia Davis', role: 'Nurse', department: 'Emergency', shift: 'Evening', status: 'Busy' },
    { id: 'A004', name: 'James Wilson', role: 'Radiologist Tech', department: 'Radiology', shift: 'Morning', status: 'Available' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Hospital Overview */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">Hospital Overview</h2>
              <p className="text-gray-300">Real-time hospital operations dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hospitalStats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Admissions</h3>
                <div className="space-y-3">
                  {todaysPatients.slice(0, 3).map((patient, index) => (
                    <div key={index} className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{patient.name}</h4>
                          <p className="text-gray-400 text-sm">{patient.condition}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-400 text-sm">{patient.time}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            patient.status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                            patient.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-blue-400/20 text-blue-400'
                          }`}>
                            {patient.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Emergency Alerts</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Critical Patient - Room 205</span>
                    </div>
                  </div>
                  <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Lab Results Pending - 3 Hours</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Maintenance - OR 3 Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Today's Patients</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Search patients..." className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Patient</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {todaysPatients.map((patient, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{patient.name} ({patient.id})</h4>
                        <p className="text-gray-400 text-sm">Age: {patient.age} | {patient.condition}</p>
                        <p className="text-gray-300 text-sm">Doctor: {patient.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-medium">{patient.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          patient.status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                          patient.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-blue-400/20 text-blue-400'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'lab':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Lab Collection</h2>
              <div className="space-y-4">
                {labCollection.map((lab, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{lab.test} ({lab.id})</h4>
                        <p className="text-gray-400 text-sm">Patient: {lab.patient}</p>
                        <p className="text-gray-300 text-sm">Collection Time: {lab.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          lab.status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                          lab.status === 'Collected' ? 'bg-blue-400/20 text-blue-400' :
                          lab.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-gray-400/20 text-gray-400'
                        }`}>
                          {lab.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'doctors':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Doctor Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorCollection.map((doctor, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{doctor.name}</h4>
                        <p className="text-gray-400 text-sm">{doctor.specialty}</p>
                        <p className="text-gray-300 text-sm">Patients: {doctor.patients} | {doctor.shift}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doctor.status === 'Available' ? 'bg-green-400/20 text-green-400' :
                          doctor.status === 'Busy' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {doctor.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'assistants':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Assistant Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assistantCollection.map((assistant, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{assistant.name}</h4>
                        <p className="text-gray-400 text-sm">{assistant.role}</p>
                        <p className="text-gray-300 text-sm">{assistant.department} | {assistant.shift}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          assistant.status === 'Available' ? 'bg-green-400/20 text-green-400' :
                          assistant.status === 'On Duty' ? 'bg-blue-400/20 text-blue-400' :
                          'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {assistant.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900/50 border-r border-gray-700/50 flex flex-col backdrop-blur-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Hospital DashBoard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700/50">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900/30 border-b border-gray-700/50 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white capitalize">
                {activeTab === 'home' ? 'Hospital Dashboard' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <p className="text-gray-400 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;