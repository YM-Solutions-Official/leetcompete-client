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
                  className="w-20 h-20 border-2 border-white bg-zinc-800 rounded-full flex items-center justify-center mb-4 relative cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
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
                </div>

                {/* Username */}
                <div className="bg-zinc-800 rounded-lg px-4 py-3 mb-4 border border-zinc-700 w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      {userData?.name || "Anonymous"}
                    </p>
                    <BsFillPencilFill className="text-zinc-400 ml-2 cursor-pointer hover:text-white" onClick={()=>navigate('/edit-profile')} />
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg px-4 py-3 mb-4 border border-zinc-700 w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-300">
                      {userData?.description || "No description provided"}
                    </p>
                    <BsFillPencilFill className="text-zinc-400 ml-2 cursor-pointer hover:text-white" onClick={()=>navigate('/edit-profile')} />
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg px-4 py-3 mb-4 border border-zinc-700 w-full">
                  <p className="text-sm text-zinc-300">
                    {userData?.email || "No email"}
                  </p>
                </div>

                {/* Join Date and Player ID */}
                <div className="space-y-1 text-sm text-zinc-400 text-center w-full">
                  <p>
                    <span className="font-medium">Joined On:</span>{" "}
                    {formatDate(userData?.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Player ID:</span>{" "}
                    {userData?._id?.slice(-10) || "N/A"}
                  </p>
                </div>
              </div>

              {/* Right Section - Stats */}
              <div className="flex-1 bg-zinc-900/50 rounded-xl p-6 border border-zinc-700 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <p className="text-lg">
                    <span className="font-semibold">No of battles:</span>{" "}
                    {totalBattles}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Win:</span>{" "}
                    <span className="text-green-500">{wins}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Lose:</span>{" "}
                    <span className="text-red-500">{losses}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Win Rate:</span>{" "}
                    <span className="text-blue-500">{winRate}%</span>
                  </p>
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
