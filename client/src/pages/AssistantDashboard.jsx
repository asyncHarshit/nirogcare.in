import React, { useState ,useEffect} from 'react';
import { 
  Home, 
  Users, 
  MapPin, 
  LogOut, 
  User, 
  Bell,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Stethoscope,
  Activity,
  Plus,
  Send
} from 'lucide-react';
import { logoutUser } from '../services/logoutService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AssistantForm from '../component/UpdatedAssistantProfile';
import { getMe } from '../services/getMeServices';
import { getAssistantProfile } from '../services/assistantServices';
import AssistantData from '../component/assistantData';
import { getAllApointments } from '../services/doctorServices';

const AssistantDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [draggedPatient, setDraggedPatient] = useState(null);
  const [userData , setUserData] = useState([]);
  const [assistantData , setAssistantData] = useState([]);
  const [toggle , setToggle] = useState(false);
  const [appointments , setAllAppointments] = useState([]);

  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'patients', label: 'Todays Patients', icon: Users },
    { id: 'queue', label: 'Queue Map', icon: MapPin },
  ];

  const [kanbanData, setKanbanData] = useState({
    upcoming: [
      { id: 'P001', name: 'John Smith', age: 45, condition: 'Cardiac Checkup', doctor: 'Dr. Johnson', time: '09:00 AM', priority: 'medium' },
      { id: 'P002', name: 'Mary Wilson', age: 62, condition: 'Diabetes Follow-up', doctor: 'Dr. Brown', time: '09:30 AM', priority: 'high' },
      { id: 'P005', name: 'David Chen', age: 34, condition: 'Annual Physical', doctor: 'Dr. Johnson', time: '11:00 AM', priority: 'low' },
      { id: 'P006', name: 'Emma Taylor', age: 28, condition: 'Vaccination', doctor: 'Dr. Garcia', time: '11:30 AM', priority: 'low' },
    ],
    inProgress: [
      { id: 'P003', name: 'Robert Davis', age: 38, condition: 'Orthopedic Consultation', doctor: 'Dr. Miller', time: '10:00 AM', priority: 'medium' },
      { id: 'P004', name: 'Lisa Anderson', age: 29, condition: 'Prenatal Checkup', doctor: 'Dr. Garcia', time: '10:30 AM', priority: 'high' },
    ],
    completed: [
      { id: 'P007', name: 'Michael Brown', age: 55, condition: 'Blood Pressure Check', doctor: 'Dr. Johnson', time: '08:00 AM', priority: 'medium' },
      { id: 'P008', name: 'Sarah Wilson', age: 42, condition: 'Allergy Test', doctor: 'Dr. Brown', time: '08:30 AM', priority: 'low' },
    ],
    cancelled: [
      { id: 'P009', name: 'James Miller', age: 67, condition: 'Routine Checkup', doctor: 'Dr. Miller', time: '09:00 AM', priority: 'low' },
    ]
  });

    const getUserData = async()=>{
      const response = await getMe();
      if(response){
        setUserData(response);
      }
    } 

    const getAllApointmentsData = async()=>{
      const response = await getAllApointments();
      if(response.success){
        setAllAppointments(response?.appointments)
      }
    }
  
    useEffect(()=>{
      getUserData();
      getAllApointmentsData();
     
    },[])

    const getProfile =async()=>{
      const response = await getAssistantProfile();
      setAssistantData(response);
      if(response.success){
        console.log(response)
        setToggle(true);
      }

    }
    useEffect(()=>{
      getProfile();

    },[]) 

  // Helper function to format appointment time
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      return timeString;
    }
  };

  // Helper function to format appointment date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  // Helper function to get appointment status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
      case 'scheduled':
        return 'bg-green-400/20 text-green-400';
      case 'pending':
        return 'bg-yellow-400/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-400/20 text-red-400';
      case 'completed':
        return 'bg-blue-400/20 text-blue-400';
      default:
        return 'bg-gray-400/20 text-gray-400';
    }
  };

  // Helper function to get priority based on appointment type or urgency
  const getPriorityFromAppointment = (appointment) => {
    if (appointment.urgent || appointment.priority === 'high') return 'high';
    if (appointment.followUp || appointment.priority === 'medium') return 'medium';
    return 'low';
  };

  const handleLogout = async()=>{
    const response = await logoutUser();
    if (response?.status === 200) {
      console.log("Logout successfully !!");

      toast.success('Logout successful!');
      navigate("/auth");
    }}

  const handleDragStart = (e, patient) => {
    setDraggedPatient(patient);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedPatient) return;

    const sourceColumn = Object.keys(kanbanData).find(key => 
      kanbanData[key].some(patient => patient.id === draggedPatient.id)
    );

    if (sourceColumn === targetColumn) return;

    setKanbanData(prev => {
      const newData = { ...prev };
      newData[sourceColumn] = newData[sourceColumn].filter(p => p.id !== draggedPatient.id);
      newData[targetColumn] = [...newData[targetColumn], draggedPatient];
      return newData;
    });

    setDraggedPatient(null);
  };

  const sendNotification = (patient, status) => {
    // Simulate notification sending
    alert(`Notification sent: ${patient.name} is now ${status}`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const PatientCard = ({ patient, columnType }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, patient)}
      className={`p-4 rounded-lg border cursor-move transition-all duration-300 hover:shadow-lg ${getPriorityColor(patient.priority)} hover:border-blue-500/50`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white">{patient.name}</h4>
        <span className="text-xs text-gray-400">{patient.id}</span>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-gray-300">Age: {patient.age}</p>
        <p className="text-gray-300">{patient.condition}</p>
        <p className="text-blue-400">{patient.doctor}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-xs">{patient.time}</span>
          </div>
          {columnType !== 'upcoming' && (
            <button
              onClick={() => sendNotification(patient, columnType)}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-1 rounded transition-colors"
              title="Send Notification"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const KanbanColumn = ({ title, patients, columnKey, icon: Icon, color }) => (
    <div 
      className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 min-h-[600px]"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnKey)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">
            {patients.length}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} columnType={columnKey} />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">Assistant Dashboard</h2>
              <p className="text-gray-300">Manage patient queues and send notifications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-yellow-400" />
                  <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full">
                    {appointments.length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Total Appointments</h3>
                <p className="text-gray-400 text-sm">All appointments</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-blue-400" />
                  <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
                    {appointments.filter(apt => apt.status?.toLowerCase() === 'confirmed').length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Confirmed</h3>
                <p className="text-gray-400 text-sm">Confirmed appointments</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                    {appointments.filter(apt => apt.status?.toLowerCase() === 'completed').length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Completed</h3>
                <p className="text-gray-400 text-sm">Finished appointments</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">
                    {appointments.filter(apt => apt.status?.toLowerCase() === 'cancelled').length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Cancelled</h3>
                <p className="text-gray-400 text-sm">Cancelled appointments</p>
              </div>
            </div>
          </div>
        );  
      case 'patients':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">All Patients</h2>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">
                    {appointments.length} Total Appointments
                  </span>
                </div>
              </div>
              
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No Appointments Found</h3>
                  <p className="text-gray-500">There are no appointments scheduled at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div 
                      key={appointment._id || index} 
                      className="p-4 rounded-lg border border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-white text-lg">
                              {appointment.patientName || appointment.patient?.name || 'Unknown Patient'}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status || 'Pending'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-1">
                              <p className="text-gray-400">
                                <span className="font-medium">Patient ID:</span> {appointment.patientId || 'N/A'}
                              </p>
                              <p className="text-gray-400">
                                <span className="font-medium">Age:</span> {appointment.patientAge || appointment.patient?.age || 'N/A'}
                              </p>
                              <p className="text-gray-400">
                                <span className="font-medium">Gender:</span> {appointment.patientGender || appointment.patient?.gender || 'N/A'}
                              </p>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-gray-300">
                                <span className="font-medium">Doctor:</span> {appointment.doctorName || appointment.doctor?.name || 'N/A'}
                              </p>
                              <p className="text-gray-300">
                                <span className="font-medium">Specialization:</span> {appointment.doctorSpecialization || appointment.doctor?.specialization || 'N/A'}
                              </p>
                              <p className="text-gray-300">
                                <span className="font-medium">Reason:</span> {appointment.reason || appointment.condition || 'General Consultation'}
                              </p>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 font-medium">
                                  {formatDate(appointment.date || appointment.appointmentDate)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 font-medium">
                                  {formatTime(appointment.time || appointment.appointmentTime)}
                                </span>
                              </div>
                              <p className="text-gray-400">
                                <span className="font-medium">Contact:</span> {appointment.patientPhone || appointment.patient?.phone || 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-gray-700/30 rounded-md">
                              <p className="text-gray-300 text-sm">
                                <span className="font-medium">Notes:</span> {appointment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          {appointment.urgent && (
                            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                              Urgent
                            </span>
                          )}
                          <button
                            onClick={() => console.log('View appointment details:', appointment)}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
        case 'profile':
        return (
          <div className="space-y-6">
            {toggle ? <AssistantData assistantData={assistantData} /> : <AssistantForm />}

          </div>
        );

      case 'queue':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Patient Queue Management</h2>
                <div className="text-sm text-gray-400">
                  Drag and drop patients between columns to update their status
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KanbanColumn 
                  title="Upcoming" 
                  patients={kanbanData.upcoming} 
                  columnKey="upcoming"
                  icon={Clock}
                  color="text-yellow-400"
                />
                <KanbanColumn 
                  title="In Progress" 
                  patients={kanbanData.inProgress} 
                  columnKey="inProgress"
                  icon={Activity}
                  color="text-blue-400"
                />
                <KanbanColumn 
                  title="Completed" 
                  patients={kanbanData.completed} 
                  columnKey="completed"
                  icon={CheckCircle}
                  color="text-green-400"
                />
                <KanbanColumn 
                  title="Cancelled" 
                  patients={kanbanData.cancelled} 
                  columnKey="cancelled"
                  icon={XCircle}
                  color="text-red-400"
                />
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
                  <span className="ml-auto w-2 h-2 bg-cyan-300 rounded-full "></span>
                )}
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
        <header className="bg-gray-900/30 border-b border-gray-700/50 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white capitalize">
                {activeTab === 'home' ? 'Assistant Dashboard' : 
                 activeTab === 'queue' ? 'Queue Management' : 
                 activeTab.replace(/([A-Z])/g, ' $1').trim()}
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

export default AssistantDashboard;