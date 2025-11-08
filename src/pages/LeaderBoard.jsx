import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { serverURL } from "../App";
import { FaUserCircle, FaMedal, FaGem, FaTrophy, FaCrown } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import RatingTiers from "../components/RatingTiers";

function LeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { userData } = useUser();
  const currentUserId = userData?._id;

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await fetch(`${serverURL}/user/getleaderboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderBoard();
  }, []);

  const userRank =
    currentUserId && leaderboardData.length > 0
      ? leaderboardData.findIndex((user) => user._id === currentUserId) + 1
      : null;

  const getTier = (rating) => {
    if (rating == null || typeof rating !== "number") return { name: "Unrated", icon: FaMedal, color: "text-zinc-400" };
  if (rating <= 200) return { name: "Bronze", icon: FaMedal, color: "text-amber-500" };
    if (rating <= 400) return { name: "Silver", icon: FaMedal, color: "text-slate-300" };
    if (rating <= 800) return { name: "Gold", icon: FaMedal, color: "text-yellow-400" };
    if (rating <= 1300) return { name: "Platinum", icon: FaGem, color: "text-sky-400" };
    if (rating <= 2000) return { name: "Diamond", icon: FaGem, color: "text-indigo-400" };
    if (rating <= 2900) return { name: "Champion", icon: FaTrophy, color: "text-rose-500" };
    return { name: "Arceus", icon: FaCrown, color: "text-rose-400" };
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center pt-32 pb-20 px-4 relative overflow-hidden">
        <RatingTiers />
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-zinc-900/60 to-zinc-950"></div>
        <div className="w-full max-w-3xl z-10 mt-10">
          {leaderboardData.length === 0 ? (
            <p className="text-zinc-400 text-center">No users found.</p>
          ) : (
            <>
              {/* ✅ START: Table Headers */}
              <div className="flex justify-between items-center px-4 py-2 mb-3 text-zinc-400 text-sm font-semibold uppercase border-b border-zinc-800">
                {/* Left Header Block (Rank + User) */}
                <div className="flex items-center gap-4">
                  <span className="w-6 text-right">Rank</span>
                  <span className="w-12"></span> {/* Spacer for image */}
                  <span>Name</span>
                </div>
                {/* Right Header Block (Rating) */}
                <span>Rating</span>
              </div>
              {/* ✅ END: Table Headers */}

              {leaderboardData.map((user, index) => (
                <div
                  key={user._id || index}
                  className={`flex justify-between items-center bg-zinc-900/70 border backdrop-blur-md rounded-2xl p-4 mb-3 shadow-md transition-all 
                    ${
                      user._id === currentUserId
                        ? "border-blue-500/70 bg-blue-500/10 shadow-blue-500/10"
                        : "border-zinc-800 hover:border-blue-600/40 hover:shadow-blue-500/5"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-blue-500 font-bold text-lg w-6 text-right">
                      {index + 1}.
                    </div>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-zinc-700" />
                    )}
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-zinc-400">Rank #{index + 1}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-blue-400 font-semibold text-lg">{user.rating ?? "—"}</span>
                    {/* Tier badge */}
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-300">
                      {(() => {
                        const tier = getTier(user.rating);
                        const Icon = tier.icon;
                        return (
                          <div className="flex items-center gap-2">
                            <Icon className={`${tier.color} w-4 h-4`} />
                            <span className={`font-medium ${tier.color} text-xs`}>{tier.name}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Rating tiers legend */}

        {/* Current User Rank */}
        <div className="mt-6 text-center z-10">
          {userRank ? (
            <h2 className="text-lg text-zinc-400">
              Your Rank: <span className="text-blue-400 font-semibold">#{userRank}</span>
            </h2>
          ) : (
            <h2 className="text-lg text-zinc-500">You’re not ranked yet.</h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LeaderBoard;