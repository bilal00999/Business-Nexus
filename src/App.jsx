import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InvestorDashboard from "./pages/dashboard/InvestorDashboard";
import EntrepreneurDashboard from "./pages/dashboard/EntrepreneurDashboard";
import InvestorProfile from "./pages/profile/InvestorProfile";
import EntrepreneurProfile from "./pages/profile/EntrepreneurProfile";
import ChatWindow from "./pages/chat/ChatWindow";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import "../src/index.css"; // adjust path if needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile/investor/:id" element={<InvestorProfile />} />
        <Route
          path="/profile/entrepreneur/:id"
          element={<EntrepreneurProfile />}
        />
      </Route>

      <Route element={<ProtectedRoute role="investor" />}>
        <Route path="/dashboard/investor" element={<InvestorDashboard />} />
      </Route>

      <Route element={<ProtectedRoute role="entrepreneur" />}>
        <Route
          path="/dashboard/entrepreneur"
          element={<EntrepreneurDashboard />}
        />
      </Route>

      <Route path="/chat/:userId" element={<ChatWindow />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
