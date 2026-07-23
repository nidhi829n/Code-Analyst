import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";

import Dashboard from "./pages/dashboard";
import History from "./pages/history";
import ReviewDetails from "./pages/ReviewDetails";
import Profile from "./pages/profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic Detailed Review Route */}
        <Route
          path="/review/:id"
          element={
            <ProtectedRoute>
              <ReviewDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;