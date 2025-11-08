import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "<DevCompete/>";
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  const Cursor = () => (
    <span className="animate-pulse text-6xl md:text-8xl text-white">|</span>
  );

  return (
    <section className="min-h-[calc(100vh-80px)] bg-black flex items-center justify-center px-4 py-20 relative overflow-hidden font-[Poppins]">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-lighten filter blur-[120px] opacity-25 animate-blob"></div>
      <div className="max-w-6xl mx-auto text-center relative z-10 mt-10">
        <h1 className="text-5xl md:text-8xl font-extrabold mb-6 min-h-[100px] md:min-h-[120px] tracking-tight leading-snug select-none">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,115,255,0.4)]">
            <i>{displayedText.slice(0, 4)}</i>
          </span>
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,140,0,0.4)]">
            {<i>{displayedText.slice(4)}</i>}
          </span>
          <Cursor />
        </h1>

        <p className="text-zinc-300 text-xl md:text-4xl  max-w-3xl mx-auto leading-relaxed font-semibold mb-1">
          Challenge developers worldwide
        </p>
        <p className="text-zinc-400 text-sm md:text-base mb-12 max-w-3xl mx-auto leading-relaxed font-bold">
          Compete in real-time coding battles and prove your skills.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate("/battle")}
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold text-lg tracking-wide shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-105 focus:outline-none"
          >
            ⚡ Create Room
            <span className="absolute inset-0 rounded-xl border border-blue-400 opacity-20 group-hover:opacity-40 transition"></span>
          </button>

          <button
            onClick={() => navigate("/join-room")}
            className="group relative px-10 py-4 bg-zinc-900 text-white rounded-xl font-semibold text-lg tracking-wide border border-zinc-700 shadow-lg hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none"
          >
            ⚔️ Join Room
            <span className="absolute inset-0 rounded-xl border border-orange-400 opacity-20 group-hover:opacity-40 transition"></span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
          {[
            {
              icon: "⚡",
              title: "Real-Time Battles",
              desc: "Face developers worldwide in live coding duels and climb the leaderboard.",
            },
            {
              icon: "🏆",
              title: "Track Progress",
              desc: "Measure your growth, view performance analytics, and level up your skills.",
            },
            {
              icon: "💻",
              title: "Multiple Languages",
              desc: "Write solutions in your favorite language — C++, Java, Python, or JavaScript.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-2xl border border-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-blue-600 hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-default backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Icon with glow */}
              <div className="relative z-10 text-5xl mb-4 mt-8 transition-transform duration-300 group-hover:scale-110">
                <span>
                  {item.icon}
                </span>
              </div>

              <h3 className="relative z-10 text-white font-extrabold text-2xl mb-3 tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-zinc-400 text-base leading-relaxed px-6 pb-8">
                {item.desc}
              </p>

              {/* Animated border gradient accent */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-orange-500 transition-all duration-500 opacity-30"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
