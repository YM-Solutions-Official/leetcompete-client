import logo from "/devCompete.png";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useUser } from "../context/UserContext";
import axios from "axios";
import { serverURL } from "../App";
import { toast } from "react-toastify";
import { useState } from "react";
import { MdLeaderboard } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const { userData, clearUserData } = useUser();
  const isLoggedIn = !!userData;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = async () => {
    try {
      await axios.get(serverURL + "/auth/logout", { withCredentials: true });
      clearUserData();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
    setShowLogoutModal(false);
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  return (
    <>
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-8 z-10 min-w-[320px] flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-white">
              Confirm Logout
            </h2>
            <p className="mb-6 text-zinc-300">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
              >
                Logout
              </button>
              <button
                onClick={handleLogoutCancel}
                className="px-5 py-2 bg-zinc-700 hover:bg-zinc-800 text-white rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div>
                <img src={logo} alt="Logo" className="h-15 w-15" />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/leaderboard"
                className="md:flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              >
                <MdLeaderboard className="w-8 h-6" />
                <span className="font-medium">Leaderboard</span>
              </Link>
              {isLoggedIn ? (
                <>
                  {/* --- START: UPDATED PROFILE BUTTON --- */}
                  <Link
                    to="/profile"
                    className="md:flex items-center gap-3 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-zinc-700 border-2 border-zinc-600 flex-shrink-0">
                      {userData?.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : userData?.name ? (
                        <span className="text-sm font-bold uppercase text-white">
                          {userData.name.charAt(0)}
                        </span>
                      ) : (
                        <IoPersonCircle className="w-8 h-8 text-zinc-400" />
                      )}
                    </div>
                    <span className="font-medium truncate">
                      {userData.name || "Profile"}
                    </span>
                  </Link>
                  {/* --- END: UPDATED PROFILE BUTTON --- */}

                  <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-white hover:text-blue-400 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
