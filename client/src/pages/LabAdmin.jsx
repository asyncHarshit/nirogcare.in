import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecentAdmissions from '../component/recentAddmission';
import { getLabProfile } from '../services/labServices'; 
import { logoutUser } from "../services/logoutService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  Building,
  Settings,
  FlaskConicalIcon
} from 'lucide-react';
import UpdateLabProfile from '../component/UpdateLabProfile';
import LabRegistration from '../component/LabRegisteration';
import LabProfileView from '../component/LabProfile';


const LabDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(5);
  const [labLoading, setLabLoading] = useState(true);
  const [totalPatientsToday, setTotalPatientsToday] = useState(0);
  const [labId, setLabId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [labData, setLabData] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  // Fetch on mount
  setLabLoading(true);
  axios.get("/api/lab/profile")
    .then(res => {
      setLabId(res.data._id);
      setLabData(res.data);
      setLabLoading(false);
    })
    .catch(err => {
      console.log(err)
      setLabLoading(false);
      setLabId(null);
      setLabData(null);
    });
}, []);

useEffect(() => {
  if (activeTab !== "profile") return;
  setLabLoading(true);
  axios.get("/api/lab/profile")
    .then(res => {
      setLabId(res.data._id);
      setLabData(res.data);
      setLabLoading(false);
    })
    .catch(err => {
      console.log(err)
      setLabLoading(false);
      setLabId(null);
      setLabData(null);
    });
}, [activeTab]);

    const handleLogout = async () => {
      const response = await logoutUser();
      if (response?.status === 200) {
        console.log("Logout successfully !!");
  
        toast.success("Logout successful!");
        navigate("/auth");
      }
    };

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await axios.get("/api/lab-appointments/today/count");
        setTotalPatientsToday(response.data.count);
      } catch {
        setTotalPatientsToday(0);
      }
    }
    fetchCount();
  }, []);



  useEffect(() => {
    if (!labId) return;
    async function fetchData() {
      const res = await axios.get(`/api/lab/labs/${labId}/today-appointments`);
      setAppointments(res.data || []);
    }
    fetchData();
  }, [labId]);

    const filtered = !search.trim()
    ? appointments
    : appointments.filter(appt =>
        (appt.bookedBy?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );


  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: "profile", label: "My Profile", icon: User },
    { id: 'patients', label: 'Todays Patients', icon: Users },
    { id: 'Send Reports', label: 'Send Reports', icon: FlaskConical },
    { id: 'Update Profile', label : 'Update Profile' , icon : Settings}
  ];

  const labStats = [
    { icon: Users, label: 'Total Patients', value: totalPatientsToday, change: '+0%', color: 'text-blue-400' },
    { icon: FlaskConicalIcon, label: 'Total Collections', value: '156/200', change: '78%', color: 'text-green-400' },
    { icon: UserCheck, label: 'Assistant on Duty', value: '24', change: '+2', color: 'text-purple-400' },
    { icon: Activity, label: 'Report Submitted', value: '8', change: '+3', color: 'text-red-400' },
  ];


  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-6 rounded-xl border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">Lab Overview</h2>
              <p className="text-gray-300">Real-time Lab operations dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {labStats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
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
              <RecentAdmissions labId={labId} />

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
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {filtered.map(appt => (
                  <div
                    key={appt._id}
                    className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">
                          {appt.bookedBy?.name || "Unknown"} ({appt.bookedBy?._id || "ID"})
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Test: {appt.testDetails?.testName || "N/A"} | Type: {appt.testDetails?.testType}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {appt.doctorReference?.name && `Doctor: ${appt.doctorReference.name}`}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="text-blue-400 font-medium">
                          {new Date(appt.scheduledDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {appt.status === "Pending" ? (
                            <button
                              className="text-blue-600 bg-blue-400/20 px-3 py-1 rounded-full font-semibold hover:bg-blue-400/40 transition"
                              onClick={() => {
                                setSelectedAppointment(appt);
                                setActiveTab('Send Reports'); 
                              }}
                            >
                              Review
                            </button>
                        ) : (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              appt.status === "Completed"
                                ? "bg-green-400/20 text-green-400"
                                : appt.status === "In Progress"
                                ? "bg-yellow-400/20 text-yellow-400"
                                : "bg-blue-400/20 text-blue-400"
                            }`}
                          >
                            {appt.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-gray-400 text-center">No patients found today.</div>
                )}
                
              </div>
            </div>
          </div>
        );
        

    case 'profile': {
      console.log("labData in render:", labData);
      if (labLoading) return <div>Loading...</div>
      const isLabRegistered = Boolean(labData && labData.address && labData.licenseNumber);
      return (
        isLabRegistered
          ? <LabProfileView lab={labData}/>
          : <LabRegistration onRegistered={async () => {
              setLabLoading(true);
              const data = await getLabProfile();
              setLabId(data._id);
              setLabData(data);
              setLabLoading(false);
            }}/>
      );
    }
        
      case 'Send Reports':
        return (
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Upload Patient Report</h2>

          {!selectedAppointment ? (
            <p className="text-gray-400">Please select a patient from the Today's Patients list first.</p>
          ) : (
            <UploadReportForm appointment={selectedAppointment} />
          )}
        </div>
        );
      case 'Update Profile':
      return (
        <>
          {labData ? (
            <UpdateLabProfile labData={labData} />
          ) : (
            <div className="text-white text-center">Loading profile...</div>
          )}
        </>
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
            <div className="flex items-center gap-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl border border-emerald-500/30">
                  <Stethoscope className="text-emerald-400 w-7 h-7 group-hover:text-emerald-300" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-blue-300 transition-all duration-300">
                  NirogCare
                </h1>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg  ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white border border-blue-500/50'
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
          <button onClick = {handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300">
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
                {activeTab === 'home' ? 'Lab Dashboard' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
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

export default LabDashboard;