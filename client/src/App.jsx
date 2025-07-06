import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import SelectRole from "./pages/SelectRole";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProtectedRoute from "./component/protectedRoute";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import AssistantDashboard from "./pages/AssistantDashboard";
import LabAdmin from "./pages/LabAdmin";
import { ProtectRole } from "./component/protect_role";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/select-role"
        element={
          <ProtectRole>
             <SelectRole />
          </ProtectRole>
           
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospitalAdmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labAdmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["labAdmin"]}>
            <LabAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assistant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["assistant"]}>
            <AssistantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <div className="text-center mt-10 text-red-600 text-xl">
            Unauthorized Access
          </div>
        }
      />
    </Routes>
  );
};

export default App;
