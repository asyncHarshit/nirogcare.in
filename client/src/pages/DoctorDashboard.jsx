import React, { useState,useEffect } from 'react';
import { 
  Home, 
  Users, 
  User, 
  Bell,
  Activity,
  Calendar,
  Clock,
  Search,
  Plus,
  Heart,
  Stethoscope,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Edit,
  CheckCircle,
  AlertCircle,
  XCircle,
  PanelLeft
} from 'lucide-react';
import { logoutUser } from '../services/logoutService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [toggleSideBar, setToggleSideBar] = useState(false);











  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setToggleSideBar(false); 
        } else {
          setToggleSideBar(true);
        }
      };
  
    // Call on mount
    handleResize();
  
    // Optional: respond to future resizes
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);



  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'patients', label: 'Today\'s Patients', icon: Users },
  ];


    const handleLogout = async () => {
    const response = await logoutUser();
    if (response?.status === 200) {
      console.log("Logout successfully !!");

      toast.success("Logout successful!");
      navigate("/auth");
    }
  };


  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    id: 'DOC-001',
    phone: '+1 (555) 123-4567',
    email: 'dr.johnson@hospital.com',
    address: '123 Medical Center Dr, City, State 12345',
    experience: '12 years',
    education: 'MD from Harvard Medical School',
    license: 'MD12345',
    todaySchedule: '9:00 AM - 5:00 PM',
    nextAppointment: '2:30 PM - John Smith'
  };

  const todaysStats = [
    { icon: Users, label: 'Total Patients', value: '12', change: '+2 from yesterday', color: 'text-blue-400' },
    { icon: CheckCircle, label: 'Completed', value: '8', change: '67% done', color: 'text-green-400' },
    
  ];

  const todaysPatients = [
    { 
      id: 'P001', 
      name: 'John Smith', 
      age: 45, 
      condition: 'Cardiac Checkup', 
      time: '09:00 AM', 
      status: 'Completed',
      vitals: { bp: '120/80', pulse: '72 bpm', temp: '98.6°F' },
      notes: 'Regular checkup, all vitals normal'
    },
    { 
      id: 'P002', 
      name: 'Mary Wilson', 
      age: 62, 
      condition: 'Hypertension Follow-up', 
      time: '10:30 AM', 
      status: 'Completed',
      vitals: { bp: '140/90', pulse: '80 bpm', temp: '98.4°F' },
      notes: 'Blood pressure slightly elevated, medication adjusted'
    },
    { 
      id: 'P003', 
      name: 'Robert Davis', 
      age: 38, 
      condition: 'Chest Pain Consultation', 
      time: '02:00 PM', 
      status: 'In Progress',
      vitals: { bp: '130/85', pulse: '85 bpm', temp: '99.1°F' },
      notes: 'Experiencing chest discomfort, ECG ordered'
    },
    { 
      id: 'P004', 
      name: 'Lisa Anderson', 
      age: 55, 
      condition: 'Post-Surgery Follow-up', 
      time: '03:30 PM', 
      status: 'Waiting',
      vitals: { bp: '-', pulse: '-', temp: '-' },
      notes: 'Post-operative checkup scheduled'
    },
    { 
      id: 'P005', 
      name: 'Michael Brown', 
      age: 67, 
      condition: 'Arrhythmia Monitoring', 
      time: '04:15 PM', 
      status: 'Emergency',
      vitals: { bp: '160/95', pulse: '105 bpm', temp: '98.8°F' },
      notes: 'Irregular heartbeat detected, immediate attention required'
    },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r  from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, {doctorInfo.name}!
                
              </h2>
              <p className="text-gray-300">
                Medicine cures the body. Kindness cures the soul.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {todaysStats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>

                </div>
              ))}
            </div>

            {/* Today's Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h3>
                <div className="space-y-3">
                  {todaysPatients.filter(p => p.status === 'Waiting' || p.status === 'In Progress').map((patient, index) => (
                    <div key={index} className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{patient.name}</h4>
                          <p className="text-gray-400 text-sm">{patient.condition}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-400 text-sm">{patient.time}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            patient.status === 'Emergency' ? 'bg-red-400/20 text-red-400' :
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
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Completed - John Smith checkup</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">9:00 AM</p>
                  </div>
                  <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">In Progress - Robert Davis consultation</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">2:00 PM</p>
                  </div>
                  <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Emergency - Michael Brown arrhythmia</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">4:15 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">My Profile</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture and Basic Info */}
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{doctorInfo.name}</h3>
                    <p className="text-blue-400 font-medium">{doctorInfo.specialty}</p>
                    <p className="text-gray-400 text-sm mt-1">ID: {doctorInfo.id}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{doctorInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{doctorInfo.email}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-400 mt-1" />
                      <span className="text-gray-300">{doctorInfo.address}</span>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30">
                  <h4 className="text-lg font-semibold text-white mb-4">Professional Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white font-medium">{doctorInfo.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Education</p>
                      <p className="text-white font-medium">{doctorInfo.education}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">License Number</p>
                      <p className="text-white font-medium">{doctorInfo.license}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium">Patients Treated</h5>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
                <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                  <h5 className="text-green-400 font-medium">Success Rate</h5>
                  <p className="text-2xl font-bold text-white">98.5%</p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium">Specializations</h5>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium">Years Experience</h5>
                  <p className="text-2xl font-bold text-white">12</p>
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
                    <input 
                      type="text" 
                      placeholder="Search patients..." 
                      className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {todaysPatients.map((patient, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{patient.name} ({patient.id})</h4>
                        <p className="text-gray-400 text-sm">Age: {patient.age} | {patient.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-medium">{patient.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          patient.status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                          patient.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' :
                          patient.status === 'Emergency' ? 'bg-red-400/20 text-red-400' :
                          'bg-blue-400/20 text-blue-400'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-600/30 p-3 rounded-lg">
                        <h5 className="text-gray-300 font-medium mb-2">Vital Signs</h5>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">BP</p>
                            <p className="text-white">{patient.vitals.bp}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Pulse</p>
                            <p className="text-white">{patient.vitals.pulse}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Temp</p>
                            <p className="text-white">{patient.vitals.temp}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-600/30 p-3 rounded-lg">
                        <h5 className="text-gray-300 font-medium mb-2">Notes</h5>
                        <p className="text-gray-400 text-sm">{patient.notes}</p>
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
      <div
        className={
          `${toggleSideBar ? "w-64" : "w-20"} transition-all duration-300 ease-in-out bg-gray-900/50 border-r border-gray-700/50 flex flex-col backdrop-blur-sm overflow-hidden`}
      >
        <div className=" p-4 border-b border-gray-700/50">
          <div className="flex mt-0.5 items-center justify-between">
            <div className="flex items-center space-x-3 group">
              {toggleSideBar && (
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl border border-emerald-500/30">
                  <Stethoscope className="text-emerald-400 w-7 h-7 group-hover:text-emerald-300" />
                </div>
              )}

              {toggleSideBar && (
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-blue-300 transition-all duration-300">
                  NirogCare
                </h1>
              )}
            </div>
            <PanelLeft
              onClick={() => setToggleSideBar((prev) => !prev)}
              className={`${
                toggleSideBar ? "" : "mt-[10px] mb-[13px] mr-[10px]"
              } text-emerald-700 hover:text-emerald-500 cursor-pointer   transition duration-300`}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${
                    toggleSideBar ? "space-x-3" : "justify-center"
                  } cursor-pointer p-3 rounded-lg relative ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border border-green-500/50"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {toggleSideBar && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                  {activeTab === item.id && (
                    <span
                      className={`w-1.5 h-1.5 bg-cyan-300 rounded-full ${
                        toggleSideBar
                          ? "ml-auto"
                          : "absolute right-1.5 bottom-1.5"
                      }`}
                    ></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              toggleSideBar ? "space-x-3 justify-start" : "justify-center"
            } p-3 rounded-lg text-gray-300 hover:bg-red-600 cursor-pointer hover:text-white transition-all duration-300`}
          >
            <LogOut className="w-5 h-5" />
            {toggleSideBar && <span>Logout</span>}
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
                {activeTab === 'home' ? 'Dashboard' : 
                 activeTab === 'profile' ? 'My Profile' : 
                 'Today\'s Patients'}
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
                <span className="text-white font-medium">{doctorInfo.name}</span>
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

export default DoctorDashboard;