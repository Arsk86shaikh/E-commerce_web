import { Routes, Route, Navigate } from 'react-router-dom';

// -------------------------------------------------------
// Placeholder Pages (Replace with real components later)
// -------------------------------------------------------

// Auth Pages
const Login = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h1>
      <p className="text-gray-600 text-center">(Login Component - Import here)</p>
    </div>
  </div>
);

const Signup = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Signup</h1>
      <p className="text-gray-600 text-center">(Signup Component - Import here)</p>
    </div>
  </div>
);

// Admin Pages
const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
    <p className="text-gray-600">(Admin Dashboard Component - Import here)</p>
  </div>
);

const ManageUsers = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Users</h1>
    <p className="text-gray-600">(Manage Users Component - Import here)</p>
  </div>
);

const ManageStores = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Stores</h1>
    <p className="text-gray-600">(Manage Stores Component - Import here)</p>
  </div>
);

const UserDetails = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">User Details</h1>
    <p className="text-gray-600">(User Details Component - Import here)</p>
  </div>
);

// User Pages
const UserDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">User Dashboard</h1>
    <p className="text-gray-600">(User Dashboard Component - Import here)</p>
  </div>
);

const StoresPage = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Stores</h1>
    <p className="text-gray-600">(Stores Page Component - Import here)</p>
  </div>
);

const Profile = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile</h1>
    <p className="text-gray-600">(Profile Component - Import here)</p>
  </div>
);

// Owner Pages
const OwnerDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Owner Dashboard</h1>
    <p className="text-gray-600">(Owner Dashboard Component - Import here)</p>
  </div>
);

const StoreAnalytics = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Analytics</h1>
    <p className="text-gray-600">(Store Analytics Component - Import here)</p>
  </div>
);

// Shared Pages
const Unauthorized = () => (
  <div className="min-h-screen bg-red-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <p className="text-2xl text-gray-900 mb-2">Unauthorized Access</p>
      <p className="text-gray-600">You don't have permission to access this page.</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-500">The page you're looking for doesn't exist.</p>
    </div>
  </div>
);

// -------------------------------------------------------
// Layout Wrapper (Optional - Add Navbar, Footer, Sidebar)
// -------------------------------------------------------
const PageLayout = ({ children, showSidebar = false }) => (
  <div className="flex">
    {showSidebar && (
      <div className="w-64 bg-gray-900 text-white p-4">
        {/* Sidebar Component - Import here */}
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
      </div>
    )}
    <div className="flex-1 flex flex-col">
      <nav className="bg-indigo-600 text-white p-4">
        {/* Navbar Component - Import here */}
        <h1 className="text-2xl font-bold">E-commerce App</h1>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        {/* Footer Component - Import here */}
        <p>&copy; 2026 E-commerce Web. All rights reserved.</p>
      </footer>
    </div>
  </div>
);

// -------------------------------------------------------
// AppRoutes Component
// -------------------------------------------------------
export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes - No layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/user/dashboard" replace />} />

      {/* Admin Routes - With Sidebar & Layout */}
      <Route
        path="/admin/dashboard"
        element={
          <PageLayout showSidebar>
            <AdminDashboard />
          </PageLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PageLayout showSidebar>
            <ManageUsers />
          </PageLayout>
        }
      />
      <Route
        path="/admin/users/:userId"
        element={
          <PageLayout showSidebar>
            <UserDetails />
          </PageLayout>
        }
      />
      <Route
        path="/admin/stores"
        element={
          <PageLayout showSidebar>
            <ManageStores />
          </PageLayout>
        }
      />

      {/* User Routes - With Layout */}
      <Route
        path="/user/dashboard"
        element={
          <PageLayout>
            <UserDashboard />
          </PageLayout>
        }
      />
      <Route
        path="/user/stores"
        element={
          <PageLayout>
            <StoresPage />
          </PageLayout>
        }
      />
      <Route
        path="/user/profile"
        element={
          <PageLayout>
            <Profile />
          </PageLayout>
        }
      />

      {/* Owner Routes - With Sidebar & Layout */}
      <Route
        path="/owner/dashboard"
        element={
          <PageLayout showSidebar>
            <OwnerDashboard />
          </PageLayout>
        }
      />
      <Route
        path="/owner/analytics"
        element={
          <PageLayout showSidebar>
            <StoreAnalytics />
          </PageLayout>
        }
      />
      <Route
        path="/owner/profile"
        element={
          <PageLayout>
            <Profile />
          </PageLayout>
        }
      />

      {/* Shared Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
