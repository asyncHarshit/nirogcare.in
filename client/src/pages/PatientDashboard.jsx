import React, {  useEffect, useState } from 'react';
import { getAllNearbyHospitals, getAllNearbyLabs, getMyAppointment , getMyLabAppointment } from '../services/patientServices';
import HospitalAppointmentBooking from '../component/HospitalAppointmentBooking';
import { LabAppointmentBooking } from '../component/LabsAppointmentBooking';
import { logoutUser } from '../services/logoutService';
import {toast} from "sonner"
import {useNavigate} from "react-router-dom"

import { 
  Home, 
  TestTube,
  MapPin,
  FlaskConical, 
  FileText, 
  BarChart3, 
  Building2,
  LogOut, 
  User, 
  Bell,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Clock,
  Plus,
  Search,
  Filter,
  Calendar,
  Stethoscope

} from 'lucide-react';
import { getMe } from '../services/getMeServices';
import UpdatePatientProfile from '../component/UpdateProfile';
import LoaderOnly from '../component/Loader';

const PatientDashboard = () => {


  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [hospitals, setHospitals] = useState([]);
  const [labs, setLabs] = useState([]);
  const [userData , setUserData] = useState([]);
  const [appointment , setAppointment] = useState([]);
  const [labAppointments , setLabAppointment] = useState([]);
  const [loading , setLoading] = useState(true)




  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  

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



  const getAppointment = async()=>{
    const response = await getMyAppointment();
    if(response){
      setAppointment(response?.appointments);
      // console.log(response)
    }
  }   

  const getLabAppointment = async()=>{
    const response = await getMyLabAppointment();
    if(response){
      setLabAppointment(response)
    }
  }
  
  useEffect(()=>{
    if(activeTab === 'home'){
      getAppointment();
      getLabAppointment();
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

  const temp = "57 bpm"

  const vitalStats = [
    { icon: Heart, label: 'Heart Rate', value: temp, status: 'normal', color: 'text-rose-500' },
    { icon: Thermometer, label: 'Temperature', value: '98.6°F', status: 'normal', color: 'text-cyan-400' },
    { icon: Weight, label: 'Blood Pressure', value: '120/80', status: 'normal', color: 'text-purple-400' },
    { icon: Activity, label: 'Oxygen Level', value: '98%', status: 'normal', color: 'text-blue-400' },
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
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-slate-100">Upcoming Appointments</h3>
                </div>
                <button className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors hover:scale-105 transform duration-200"
                onClick={() => setActiveTab("appointment")}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {appointment.map((appt, index) => (
                  <div key={index} className="bg-gradient-to-r from-slate-800/40 to-slate-700/20 p-4 rounded-lg border border-slate-600/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-blue-400" />
                          <h4 className="font-medium text-slate-100">
                            {appt?.doctorId?.userId?.name || "Doctor Name"}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Stethoscope className="w-4 h-4 text-pink-800" />
                          <p className="text-slate-300 text-sm">
                            {appt?.doctorId?.specialization || "Specialization"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <p className="text-slate-400 text-xs">
                            {appt?.hospitalId?.name || "Hospital"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <p className="text-blue-400 font-medium">
                            {appt.date ? new Date(appt.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : "Date"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <p className="text-slate-300 text-sm">
                            {appt.timeSlot || "Time"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             

           
         <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-slate-100">Upcoming Lab Appointments</h3>
            </div>
            <button className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors hover:scale-105 transform duration-200"
            onClick={() => setActiveTab("lab")}
            >
              <Plus className="w-5 h-5" />
            </button>
                </div>
          <div className="space-y-3">
            {labAppointments.map((appointment, index) => (
              <div key={appointment._id} className="bg-gradient-to-r from-slate-800/40 to-slate-700/20 p-4 rounded-lg border border-slate-600/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FlaskConical className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-medium text-slate-100">
                        {appointment?.testDetails?.testName || "Test Name"}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <p className="text-slate-300 text-sm">
                        {appointment?.testDetails?.testType || "Test Type"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <p className="text-slate-400 text-xs">
                        {appointment?.labId?.name || "Lab Name"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <p className="text-slate-400 text-xs">
                        {appointment?.labId?.address || "Lab Address"}
                      </p>
                    </div>
                    {appointment?.notes && (
                      <div className="flex items-center gap-2 mt-1">
                        <FileText className="w-4 h-4 text-yellow-400" />
                        <p className="text-slate-400 text-xs">
                          Note: {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <p className="text-blue-400 font-medium">
                        {appointment.scheduledDate ? new Date(appointment.scheduledDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : "Date"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <p className="text-slate-300 text-sm">
                        {appointment.timeSlot || "Time"}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'Completed' ? 'bg-green-400/20 text-green-400' :
                        appointment.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                        appointment.status === 'Cancelled' ? 'bg-red-400/20 text-red-400' :
                        'bg-blue-400/20 text-blue-400'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
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
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-green-500/50 ">
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

  if (loading) return <LoaderOnly />;

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

              
                {activeTab === item.id && (
                  <span className="ml-auto w-2 h-2 bg-cyan-300 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>


        {/* Logout */}
        <div className="p-4 border-t border-gray-700/50">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300  hover:bg-red-600  cursor-pointer  transition-all duration-300">
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
                <div className="w-8 h-8 bg-gradient-to-r from-green-700 to-blue-700 rounded-full flex items-center justify-center">
                  <button className="cursor-pointer" onClick={() => setActiveTab("profile")}>
                    <User className="w-4 h-4 text-white" />
                  </button>

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