import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { FaUserCircle, FaShieldAlt, FaCode, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from local storage or api if stored securely
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    async function fetchReviews() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/v1/reviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalReviews(response.data.data.length);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-zinc-800/80">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>👤</span> Account Profile
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your account settings, role permissions, and review analytics.
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* User Header Info with Avatar Graphic */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-zinc-800 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-900/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle />}
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {user?.name || "Developer"}
              </h2>
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                <FaEnvelope className="text-zinc-500" /> {user?.email || "No email provided"}
              </p>
            </div>
          </div>

          {/* Metrics / Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* Role Card */}
            <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-6 shadow-inner flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
                <FaShieldAlt />
              </div>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Access Role
                </p>
                <p className="text-xl font-bold text-zinc-100 capitalize">
                  {user?.role || "User"}
                </p>
              </div>
            </div>

            {/* Total Reviews Card */}
            <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-6 shadow-inner flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                <FaCode />
              </div>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Total Code Reviews
                </p>
                <p className="text-xl font-bold text-zinc-100">
                  {loading ? "..." : totalReviews}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;