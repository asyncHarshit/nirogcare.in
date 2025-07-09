import React, { useEffect, useState } from 'react';
import { getAllNearbyHospitals, getAllNearbyLabs } from '../services/patientServices';
import HospitalAppointmentBooking from '../component/HospitalAppointmentBooking';
import { LabAppointmentBooking } from '../component/LabsAppointmentBooking';
import { logoutUser } from '../services/logoutService';
import {toast} from "sonner"
import {useNavigate} from "react-router-dom"

import { 
  Home, 
  Calendar, 
  FlaskConical, 
  FileText, 
  BarChart3, 
  Stethoscope,
  LogOut, 
  User, 
  Bell,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Clock,
  Menu,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { getMe } from '../services/getMeServices';
import UpdatePatientProfile from '../component/UpdateProfile';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [hospitals, setHospitals] = useState([]);
  const [labs, setLabs] = useState([]);
  const [userData , setUserData] = useState([]);

  const navigate = useNavigate();

    const handleLogout = async()=>{
    const response = await logoutUser();
    if (response?.status === 200) {
      console.log("Logout successfully !!");

      toast.success('Logout successful!');
      navigate("/auth");
    }}



  const getHospital = async()=>{
    const response = await getAllNearbyHospitals();
          if(response){
            console.log(response)
            setHospitals(response?.hospitals || []);}
  }

  useEffect(() => {
          if (activeTab === 'appointment') {
            getHospital();
          }
        }, [activeTab]);


  const getLabs = async()=>{
    const response = await getAllNearbyLabs();
    if(response){
      console.log(response)
      setLabs(response?.labs || [])
    }
  }   
  
  useEffect(()=>{
    if(activeTab === 'lab'){
      getLabs();
    }
  },[activeTab])



  const getUserData = async()=>{
    const response = await getMe();
    if(response){
      setUserData(response);
    }
  } 

  useEffect(()=>{
    getUserData();
   
  },[])



  //  console.log(userData)


        

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile' , label : 'My Profile', icon : User},
    { id: 'appointment', label: 'Book Appointment', icon: Calendar },
    { id: 'lab', label: 'Book Lab', icon: FlaskConical },
    { id: 'records', label: 'Medical Record', icon: FileText },
    { id: 'reports', label: 'Lab Report', icon: BarChart3 },
  ];

  const vitalStats = [
    { icon: Heart, label: 'Heart Rate', value: '78 bpm', status: 'normal', color: 'text-rose-500' },
    { icon: Thermometer, label: 'Temperature', value: '98.6°F', status: 'normal', color: 'text-cyan-400' },
    { icon: Weight, label: 'Blood Pressure', value: '120/80', status: 'normal', color: 'text-purple-400' },
    { icon: Activity, label: 'Oxygen Level', value: '98%', status: 'normal', color: 'text-blue-400' },
  ];

  const upcomingAppointments = [
    { doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-07-08', time: '10:00 AM' },
    { doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2025-07-10', time: '2:30 PM' },
    { doctor: 'Dr. Emily Davis', specialty: 'Orthopedics', date: '2025-07-12', time: '11:15 AM' },
  ];

  const recentLabResults = [
    { test: 'Complete Blood Count', date: '2025-07-01', status: 'Normal', doctor: 'Dr. Johnson' },
    { test: 'Lipid Panel', date: '2025-06-28', status: 'Normal', doctor: 'Dr. Smith' },
    { test: 'Thyroid Function', date: '2025-06-25', status: 'Pending', doctor: 'Dr. Brown' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6 ">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r  from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, {userData?.user?.name}
              </h2>
              <p className="text-gray-300">Here's your health overview for today</p>
            </div>

            {/* Vital Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vitalStats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                      {stat.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-gray-800/30 p-6 rounded-xl border  border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Upcoming Appointments</h3>
                <button className="text-green-400 hover:text-green-300 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{appointment.doctor}</h4>
                        <p className="text-gray-400 text-sm">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">{appointment.date}</p>
                        <p className="text-gray-400 text-sm">{appointment.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Lab Results */}
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Lab Results</h3>
              <div className="space-y-3">
                {recentLabResults.map((result, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{result.test}</h4>
                        <p className="text-gray-400 text-sm">by {result.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300">{result.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.status === 'Normal' ? 'bg-green-400/20 text-green-400' :
                          result.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'appointment':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
            <HospitalAppointmentBooking hospitals={hospitals} />
            </div>
          </div>
        );
      case 'lab':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
             <LabAppointmentBooking labs={labs} />
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="rounded-xl border ">
             <UpdatePatientProfile userData = {userData}/>
            </div>
          </div>
        );
      case 'records':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Medical Records</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Search records..." className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-green-500 focus:outline-none" />
                  </div>
                  <button className="bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-400 hover:text-white hover:border-green-500 transition-all duration-300">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { date: '2025-07-01', type: 'Consultation', doctor: 'Dr. Johnson', diagnosis: 'Routine Checkup' },
                  { date: '2025-06-15', type: 'Lab Results', doctor: 'Dr. Smith', diagnosis: 'Blood Work Normal' },
                  { date: '2025-06-01', type: 'Prescription', doctor: 'Dr. Brown', diagnosis: 'Hypertension Management' },
                  { date: '2025-05-20', type: 'Imaging', doctor: 'Dr. Wilson', diagnosis: 'X-Ray Chest' },
                ].map((record, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{record.type}</h4>
                        <p className="text-gray-400 text-sm">{record.doctor}</p>
                        <p className="text-gray-300 text-sm">{record.diagnosis}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">{record.date}</p>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Lab Reports</h2>
              <div className="space-y-4">
                {recentLabResults.map((result, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{result.test}</h4>
                        <p className="text-gray-400 text-sm">Requested by {result.doctor}</p>
                        <p className="text-gray-300 text-sm">Date: {result.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          result.status === 'Normal' ? 'bg-green-400/20 text-green-400' :
                          result.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {result.status}
                        </span>
                        <div className="mt-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">Download PDF</button>
                        </div>
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
      <div className="w-64 bg-gray-900/50  border-gray-700/50 flex flex-col backdrop-blur-sm">
        {/* Logo */}
        <div className="p-3 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl border border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300 group-hover:scale-105">
                <Stethoscope className="text-emerald-400 w-7 h-7 group-hover:text-emerald-300 transition-colors duration-300" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-blue-300 transition-all duration-300">
                NirogCare
              </h1> 
</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center cursor-pointer space-x-3 p-3 rounded-lg ${
                    activeTab === item.id
                      
                      ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border border-green-500/50'
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
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:font-bold hover:bg-red-600  cursor-pointer hover:text-black transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
            
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900/30 border-b border-gray-700/50 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
             <h2 className="text-xl font-semibold text-white capitalize flex items-center">
              {activeTab === 'home' ? 'Dashboard' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
              <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
            </h2>

              <p className="text-gray-400 text-sm">
                {new Date().toLocaleDateString('en', { 
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
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{userData?.user?.name}</span>
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

export default PatientDashboard;