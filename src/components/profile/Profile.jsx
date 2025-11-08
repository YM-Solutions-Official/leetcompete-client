import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { BsFillPencilFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useUser();
  console.log("User Data in Profile:", userData);
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const totalBattles = userData?.matches?.length || 0;
  const wins = 0;
  const losses = 0;
  const winRate =
    totalBattles > 0 ? ((wins / totalBattles) * 100).toFixed(1) : 0;

  const handleViewScores = () => {
    navigate("/history");
  };

  return (
    <>
      <Navbar />

      {/* Inline styled tooltip (no external CSS needed) */}
      <Tooltip
        id="my-tooltip"
        style={{
          backgroundColor: "#27272a",
          color: "#fff",
          borderRadius: "6px",
          padding: "6px 10px",
          fontSize: "0.85rem",
          border: "1px solid #3f3f46",
          zIndex: 9999,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white py-20 px-4 md:px-12 lg:px-20 relative overflow-visible">
        {/* Subtle grid lines */}
        <div className="fixed top-0 bottom-0 left-8 lg:left-16 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent z-10 pointer-events-none"></div>
        <div className="fixed top-0 bottom-0 right-8 lg:right-16 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto pt-10 relative z-20">
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Section - Profile Info */}
              <div className="flex-1 bg-zinc-900/50 rounded-xl p-6 border border-zinc-700 flex flex-col justify-center items-center">
                <div
                  className="w-24 h-24 border-2 border-zinc-600 bg-zinc-800 rounded-full flex items-center justify-center mb-4 relative cursor-pointer hover:border-zinc-500 transition-colors group"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Click to Change Profile Picture"
                  data-tooltip-place="top"
                  onClick={() => navigate('/edit-profile')}
                >
                  {userData?.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : userData?.name ? (
                    <span className="text-white text-3xl font-bold uppercase">
                      {userData.name.charAt(0)}
                    </span>
                  ) : (
                    <FaUser className="text-white text-3xl" />
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-zinc-700 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BsFillPencilFill className="text-white text-xs" />
                  </div>
                </div>

                {/* Username */}
                <div className="bg-zinc-800/70 rounded-lg px-4 py-3 mb-3 border border-zinc-700 w-full hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {userData?.name || "Anonymous"}
                    </p>
                    <BsFillPencilFill 
                      className="text-zinc-500 ml-2 cursor-pointer hover:text-zinc-300 transition-colors" 
                      onClick={() => navigate('/edit-profile')} 
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="bg-zinc-800/70 rounded-lg px-4 py-3 mb-3 border border-zinc-700 w-full hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-300">
                      {userData?.description || "No description provided"}
                    </p>
                    <BsFillPencilFill 
                      className="text-zinc-500 ml-2 cursor-pointer hover:text-zinc-300 transition-colors flex-shrink-0" 
                      onClick={() => navigate('/edit-profile')} 
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="bg-zinc-800/70 rounded-lg px-4 py-3 mb-4 border border-zinc-700 w-full">
                  <p className="text-sm text-zinc-300">
                    {userData?.email || "No email"}
                  </p>
                </div>

                {/* Join Date and Player ID */}
                <div className="space-y-1.5 text-sm text-zinc-400 text-center w-full">
                  <p>
                    <span className="font-medium text-zinc-300">Joined On:</span>{" "}
                    {formatDate(userData?.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Player ID:</span>{" "}
                    {userData?._id?.slice(-10) || "N/A"}
                  </p>
                </div>
              </div>

              {/* Right Section - Stats */}
              <div className="flex-1 bg-zinc-900/50 rounded-xl p-6 border border-zinc-700 flex items-center justify-center">
                <div className="text-center space-y-4 w-full">
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <p className="text-base text-zinc-400 mb-1">Total Battles</p>
                    <p className="text-2xl font-semibold text-white">{totalBattles}</p>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <p className="text-base text-zinc-400 mb-1">Wins</p>
                    <p className="text-2xl font-semibold text-green-500">{wins}</p>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <p className="text-base text-zinc-400 mb-1">Losses</p>
                    <p className="text-2xl font-semibold text-red-500">{losses}</p>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <p className="text-base text-zinc-400 mb-1">Win Rate</p>
                    <p className="text-2xl font-semibold text-blue-500">{winRate}%</p>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg px-4 py-3 border border-zinc-700/50">
                    <p className="text-base text-zinc-400 mb-1">Rating</p>
                    <p className="text-2xl font-semibold text-blue-500">{userData?.rating || 100}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleViewScores}
              className="w-full mt-8 bg-gradient-to-r from-gray-600 to-zinc-600 hover:from-gray-500 hover:to-zinc-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              View Previous Scores
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;