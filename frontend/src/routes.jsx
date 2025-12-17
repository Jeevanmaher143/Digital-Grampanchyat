import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./user/UserProfile";
import ApplyService from "./user/ApplyService";
import ApplicationStatus from "./user/ApplicationStatus";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Development from "./pages/Development";
import Gallery from "./pages/Gallery";
import Notices from "./pages/Notices";
import Services from "./pages/Services";
import Scheme from "./pages/Scheme";
import NoticesPreview from "./components/home/NoticesPreview";
//import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
// Admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageNotices from "./admin/ManageNotices";
import ManageServices from "./admin/ManageServices";
import ManageSchemes from "./admin/ManageSchemes";
import ManageGallery from "./admin/ManageGallery";
import ManageComplaints from "./admin/ManageComplaints";
import ManageDevelopment from "./admin/ManageDevelopment";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/development" element={<Development />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/schemes" element={<Scheme />} />
      <Route path="/notic" element={<NoticesPreview />} />
      <Route path="/apply-service" element={<ApplyService />} />
      <Route path="/application-status" element={<ApplicationStatus />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES (NESTED) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* default */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="schemes" element={<ManageSchemes />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="development" element={<ManageDevelopment />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
