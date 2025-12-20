import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  // ✅ Hide footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </AuthProvider>
  );
}

export default App;
