import React, { useState } from 'react';
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

const AssistantDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);
  const [draggedPatient, setDraggedPatient] = useState(null);

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
                    {kanbanData.upcoming.length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Upcoming</h3>
                <p className="text-gray-400 text-sm">Patients waiting</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-blue-400" />
                  <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
                    {kanbanData.inProgress.length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">In Progress</h3>
                <p className="text-gray-400 text-sm">Currently treating</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                    {kanbanData.completed.length}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">Completed</h3>
                <p className="text-gray-400 text-sm">Finished today</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">
                    {kanbanData.cancelled.length}
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
              <h2 className="text-2xl font-bold text-white mb-6">Today's Patients</h2>
              <div className="space-y-4">
                {[...kanbanData.upcoming, ...kanbanData.inProgress, ...kanbanData.completed, ...kanbanData.cancelled].map((patient) => (
                  <div key={patient.id} className={`p-4 rounded-lg border transition-all duration-300 ${getPriorityColor(patient.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{patient.name} ({patient.id})</h4>
                        <p className="text-gray-400 text-sm">Age: {patient.age} | {patient.condition}</p>
                        <p className="text-gray-300 text-sm">Doctor: {patient.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-medium">{patient.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          patient.priority === 'high' ? 'bg-red-400/20 text-red-400' :
                          patient.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-green-400/20 text-green-400'
                        }`}>
                          {patient.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
              <AssistantForm />
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
                <span className="text-white font-medium">Assistant</span>
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