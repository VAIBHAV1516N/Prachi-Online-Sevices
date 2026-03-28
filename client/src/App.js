import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGallery from "./pages/AdminGallery";
import AdminLogin from "./pages/AdminLogin";
import AdminRequests from "./pages/AdminRequests";
import AdminServices from "./pages/AdminServices";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RequestForm from "./pages/RequestForm";
import Services from "./pages/Services";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/request"
            element={
              <>
                <Navbar />
                <RequestForm />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
