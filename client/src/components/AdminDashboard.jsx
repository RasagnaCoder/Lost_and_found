export default function AdminDashboard() {
    return (
      <div className="dashboard">
        <h1>Admin Panel</h1>
        <div className="admin-actions">
          <button>Manage Users</button>
          <button>View All Reports</button>
          <button>System Settings</button>
        </div>
      </div>
    );
  }