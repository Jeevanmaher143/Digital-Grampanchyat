import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* BRAND */}
          <div className="navbar-brand">
            <Link to="/">Gram Panchayat</Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="nav-desktop-menu">
            {/* COMMON LINKS */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/schemes">Schemes</Link>
            <Link to="/notices">Notices</Link>
            <Link to="/development">Development</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>

            {/* USER NOT LOGGED IN */}
            {!user && (
              <Link to="/login" className="login-button">
                Login
              </Link>
            )}

            {/* USER LOGGED IN → PROFILE */}
            {user && (
              <div className="profile-dropdown">
                <button
                  className="profile-button"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  {user.name || "Profile"} ▼
                </button>

                {profileOpen && (
                  <div className="profile-menu">
                    <Link to="/profile" onClick={() => setProfileOpen(false)}>
                      My Profile
                    </Link>
                    <Link to="/apply-service" onClick={() => setProfileOpen(false)}>
                      Apply Service
                    </Link>
                    <Link
                      to="/application-status"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Applications
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="nav-mobile-button">
            <button onClick={() => setOpen(!open)} className="nav-toggle-button">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="nav-mobile-menu-wrapper">
          <Link to="/" className="nav-mobile-link">Home</Link>
          <Link to="/about" className="nav-mobile-link">About</Link>
          <Link to="/services" className="nav-mobile-link">Services</Link>
          <Link to="/schemes" className="nav-mobile-link">Schemes</Link>
          <Link to="/notices" className="nav-mobile-link">Notices</Link>
          <Link to="/development" className="nav-mobile-link">Development</Link>
          <Link to="/gallery" className="nav-mobile-link">Gallery</Link>
          <Link to="/contact" className="nav-mobile-link">Contact</Link>

          {!user && (
            <Link to="/login" className="nav-mobile-link">
              Login
            </Link>
          )}

          {user && (
            <>
              <Link to="/user-profile" className="nav-mobile-link">
                My Profile
              </Link>
              <Link to="/apply-service" className="nav-mobile-link">
                Apply Service
              </Link>
              <Link to="/application-status" className="nav-mobile-link">
                My Applications
              </Link>
              <button onClick={handleLogout} className="mobile-logout-button">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
