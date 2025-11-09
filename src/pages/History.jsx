import { useState, useEffect } from "react";
import { FaTrophy, FaTimes, FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function History() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchHistory();
  }, []);

  const fetchMatchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/user/getmatchhistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch match history");
      }

      const data = await response.json();
      setMatchHistory(data);
    } catch (error) {
      console.error("Error fetching match history:", error);
      toast.error("Failed to load match history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  const formatDuration = (minutes) => {
    if (!minutes || isNaN(minutes)) return "N/A";
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${mins} min`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white py-20 px-4 md:px-12 lg:px-20 relative">
        {/* Vertical Grid Lines */}
        <div className="fixed top-0 bottom-0 left-8 lg:left-16 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent z-10"></div>
        <div className="fixed top-0 bottom-0 right-8 lg:right-16 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-transparent z-10"></div>

        <div className="max-w-4xl mx-auto pt-10">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-8 text-white text-center">
            Previous Matches
          </h1>

          {/* Match History List */}
          <div className="space-y-6">
            {loading ? (
              <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-12 text-center">
                <p className="text-zinc-400 text-lg">Loading match history...</p>
              </div>
            ) : matchHistory.length === 0 ? (
              <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-12 text-center">
                <p className="text-zinc-400 text-lg">No match history yet</p>
                <p className="text-zinc-500 text-sm mt-2">
                  Start battling to see your match history!
                </p>
              </div>
            ) : (
              matchHistory.map((match, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 shadow-lg hover:border-zinc-600 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Match Details */}
                    <div className="space-y-3">
                      {/* Match ID */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-medium">
                          Match Id:
                        </span>
                        <span className="text-white font-mono text-sm">
                          {match.matchId.substring(0, 8)}...
                        </span>
                      </div>

                      {/* Opponent */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-medium">
                          Against:
                        </span>
                        <span className="text-white">{match.opponent}</span>
                      </div>

                      {/* Problems Solved */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-medium">
                          Problem Solve:
                        </span>
                        <span className="text-white">
                          {match.problemsSolved}
                        </span>
                      </div>

                      {/* Result */}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-medium">
                          Result:
                        </span>
                        <span
                          className={`font-semibold flex items-center gap-2 ${
                            match.result === "Win"
                              ? "text-green-500"
                              : match.result === "Loss"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {match.result === "Win" ? (
                            <FaTrophy className="text-yellow-500" />
                          ) : match.result === "Loss" ? (
                            <FaTimes />
                          ) : (
                            <span className="text-sm">─</span>
                          )}
                          {match.result}
                        </span>
                      </div>
                    </div>

                    {/* Right Column - Date & Actions */}
                    <div className="flex flex-col justify-between items-end">
                      {/* Date */}
                      {match.date && (
                        <div className="text-zinc-400 text-sm text-right">
                          {new Date(match.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}

                      {/* View Details Button */}
                      <button
                        onClick={() => handleViewDetails(match)}
                        className="mt-4 px-4 py-2 bg-white hover:bg-zinc-200 text-black text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Load More Indicator */}
            {matchHistory.length > 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-zinc-500">
                  <span className="text-4xl">...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-3xl w-full relative shadow-2xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Modal Header - Fixed */}
            <div className="p-6 border-b border-zinc-700">
              <h2 className="text-2xl font-bold text-white pr-8 text-center">
                Match Details
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 flex-1">
              {/* Match Information - 3 on top, 3 on bottom */}
              <div className="space-y-4 mb-6">
                {/* Top Row - 3 items */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Match ID</p>
                    <p className="text-white font-mono text-sm">
                      {selectedMatch.matchId.substring(0, 8)}...
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Date</p>
                    <p className="text-white text-sm">
                      {new Date(selectedMatch.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Duration</p>
                    <p className="text-white text-sm">
                      {formatDuration(selectedMatch.duration)}
                    </p>
                  </div>
                </div>

                {/* Bottom Row - 3 items */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Opponent</p>
                    <p className="text-white text-sm">
                      {selectedMatch.opponent}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Points</p>
                    <p className="text-white text-sm font-semibold">
                      {selectedMatch.points}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Result</p>
                    <p
                      className={`text-sm font-semibold flex items-center gap-1 ${
                        selectedMatch.result === "Win"
                          ? "text-green-500"
                          : selectedMatch.result === "Loss"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {selectedMatch.result === "Win" ? (
                        <FaTrophy className="text-yellow-500 text-xs" />
                      ) : selectedMatch.result === "Loss" ? (
                        <FaTimes className="text-xs" />
                      ) : (
                        <span className="text-xs">─</span>
                      )}
                      {selectedMatch.result}
                    </p>
                  </div>
                </div>

                {/* Comparison Row */}
                <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-zinc-400 text-xs mb-2">Your Solved</p>
                      <p className="text-white text-2xl font-bold">
                        {selectedMatch.problemsSolved.split("/")[0]}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-400 text-xs mb-2">
                        {selectedMatch.opponent} Solved
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {selectedMatch.opponentSolved.split("/")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default History;

