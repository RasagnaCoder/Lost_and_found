// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';  // Import ProtectedRoute component
import UserDashboard from './Components/UserDashboard'; 
import AdminDashboard from './Components/AdminDashboard'; 
import ReportItem from './components/ReportItem'; 
import FoundItems from './components/FoundItems';  // Ensure this component is imported
import UserReportedItems from './components/UserReportedItems';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { 
    path: "/dashboard", 
    element: <ProtectedRoute><UserDashboard /></ProtectedRoute> 
  },
  { 
    path: "/admin-dashboard", 
    element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute> 
  },
  { 
    path: "/report-item", 
    element: <ProtectedRoute><ReportItem /></ProtectedRoute> 
  },
  {
    path: "/found-items",  // Add this route for found items
    element: <FoundItems />  // This points to the FoundItems component
  },
  {
    path: "/user-reported-items",  // Add this route for found items
    element: <UserReportedItems />  // This points to the FoundItems component
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
