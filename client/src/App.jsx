import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaEnvelope, FaLock, FaUser, FaCheckCircle } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard
import ReportItem from './components/ReportItem'; // Import ReportItem
import FoundItems from './components/FoundItems'; // Import FoundItems
import UserReportedItems from './components/UserReportedItems'; 

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
    terms: false
  });
  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setApiError(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setApiError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = response.data.user.role === 'admin' 
        ? '/admin-dashboard' 
        : '/dashboard';
    } catch (error) {
      setApiError(error.response?.data?.error || 'Login failed');
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setPasswordError(false);
  
    // Validations
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    if (formData.password.length < 8) {
      setApiError("Password must be at least 8 characters");
      return;
    }
  
    try {
      const response = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
  
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      setApiError(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <>
    <div className="app">
      <header>
        <div className="logo">
          <img
            src="https://img.icons8.com/?size=160&id=ObuWtTlsoTj6&format=png"
            alt="CBIT Logo"
            className="logo-img"
          />
          <div className="logo-text">Lost<span>&</span>Found</div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="left-side">
            <h1>College Lost & Found System</h1>
            <p className="tagline">"What is lost can always be found, if we seek with patience and hope."</p>
            <div className="description">
              <p>Our campus-wide lost and found service connects students and faculty with their missing belongings.</p>
              <p>Whether you've lost your student ID, keys, electronics, or any personal item, our system helps track and recover your valuables.</p>
              <ul className="features">
                <li><FaCheckCircle className="feature-icon" /> Easy reporting of lost items</li>
                <li><FaCheckCircle className="feature-icon" /> Quick search of found items database</li>
                <li><FaCheckCircle className="feature-icon" /> Email notifications when matches are found</li>
                <li><FaCheckCircle className="feature-icon" /> Secure item retrieval process</li>
              </ul>
            </div>
          </div>
          <div className="right-side">
            <div className="auth-box">
              <div className="tabs">
                <button
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => handleTabChange('login')}
                >
                  Login
                </button>
                <button
                  className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                  onClick={() => handleTabChange('signup')}
                >
                  Sign Up
                </button>
              </div>

              <div className="tab-content">
                {apiError && (
                  <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                    {apiError}
                  </div>
                )}

                {activeTab === 'login' ? (
                  <form id="login-form" onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <div className="input-icon">
                        <FaEnvelope className="icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <div className="input-icon">
                        <FaLock className="icon" />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-options">
                      <div className="remember-me">
                        <input
                          type="checkbox"
                          id="remember"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="remember">Remember me</label>
                      </div>
                      <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-submit">Sign In</button>
                  </form>
                ) : (
                  <form id="signup-form" onSubmit={handleSignupSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <div className="input-icon">
                        <FaUser className="icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="signup-email">Email</label>
                      <div className="input-icon">
                        <FaEnvelope className="icon" />
                        <input
                          type="email"
                          id="signup-email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="signup-password">Password</label>
                      <div className="input-icon">
                        <FaLock className="icon" />
                        <input
                          type="password"
                          id="signup-password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <div className="input-icon">
                        <FaLock className="icon" />
                        <input
                          type="password"
                          id="confirm-password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {passwordError && (
                        <small className="error-message" style={{ color: 'red' }}>Passwords don't match!</small>
                      )}
                    </div>
                    <div className="terms">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                    <button type="submit" className="btn btn-submit">Create Account</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Campus Lost & Found. All rights reserved.</p>
        </div>
      </footer>
    </div>
    
    </>
  );
}

export default App;