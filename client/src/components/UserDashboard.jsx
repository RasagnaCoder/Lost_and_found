import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          Welcome, <span style={{ color: "#a855f7" }}>{user?.name || "User"}</span>!
        </h1>
        <p>Manage your lost and found items from your personal dashboard.</p>
      </div>

      <div className="dashboard-section">
        <h2>Report Lost Item</h2>
        <p>Lost something? Create a detailed report to help find it.</p>
        <button onClick={() => navigate('/report-item')}>+ Report Item</button>
      </div>

      <div className="dashboard-section">
        <h2>Browse Found Items</h2>
        <p>Looking for something? Browse through items found on campus.</p>
        <button onClick={() => navigate('/found-items')}>Browse Found Items</button>
      </div>

      <div className="dashboard-section">
        <h2>Your Reported Items</h2>
        <p>Check the list of items you’ve reported as lost.</p>
        <button onClick={() => navigate('/user-reported-items')}>View Reported Items</button>
      </div>

      <div className="dashboard-section">
        <h2>Potential Matches</h2>
        <p>No potential matches found at this time.</p>
      </div>

      <footer className="dashboard-footer">
        <p>© 2025 Campus Lost & Found. All rights reserved.</p>
      </footer>
    </div>
  );
}
