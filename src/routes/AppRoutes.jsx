import { Routes, Route } from 'react-router-dom';

// Common Components
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Navbar from '../components/common/Navbar';
import Pagination from '../components/common/Pagination';
import SearchFilter from '../components/common/SearchFilter';
import Sidebar from '../components/common/Sidebar';
import Table from '../components/common/Table';

// -------------------------------------------------------
// Loading Spinner Component
// -------------------------------------------------------
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <Loader />
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Placeholder Component - Temporary
// -------------------------------------------------------
function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Navbar />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg">Coming Soon...</p>
        <p className="text-gray-400 text-sm mt-2">(Components from /src/components/common are loaded)</p>
      </div>
      <Footer />
    </div>
  );
}

// -------------------------------------------------------
// AppRoutes
// -------------------------------------------------------
export default function AppRoutes() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<PlaceholderPage title="Welcome" />} />

      {/* Auth routes - TEMPORARY */}
      <Route path="/login" element={<PlaceholderPage title="Login Page" />} />
      <Route path="/signup" element={<PlaceholderPage title="Signup Page" />} />

      {/* Admin routes - TEMPORARY */}
      <Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" />} />
      <Route path="/admin/users" element={<PlaceholderPage title="Manage Users" />} />
      <Route path="/admin/users/:userId" element={<PlaceholderPage title="User Details" />} />
      <Route path="/admin/stores" element={<PlaceholderPage title="Manage Stores" />} />

      {/* User routes - TEMPORARY */}
      <Route path="/user/dashboard" element={<PlaceholderPage title="User Dashboard" />} />
      <Route path="/user/stores" element={<PlaceholderPage title="Stores Page" />} />
      <Route path="/user/profile" element={<PlaceholderPage title="User Profile" />} />

      {/* Owner routes - TEMPORARY */}
      <Route path="/owner/dashboard" element={<PlaceholderPage title="Owner Dashboard" />} />
      <Route path="/owner/analytics" element={<PlaceholderPage title="Store Analytics" />} />
      <Route path="/owner/profile" element={<PlaceholderPage title="Owner Profile" />} />

      {/* Shared - TEMPORARY */}
      <Route path="/unauthorized" element={<PlaceholderPage title="Unauthorized Access" />} />
      <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
    </Routes>
  );
}
