import { IoSettingsSharp } from "react-icons/io5";
import { FaCode, FaChartLine, FaClock, FaLaptopCode } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import devimage from "../../assets/dev_compimage.jpg";

function FeaturesSection() {
    const features = [
        {
            icon: IoSettingsSharp,
            title: "Custom Room Settings",
            description: "Choose number of problems, difficulty levels, topics, and battle duration",
            color: "blue"
        },
        {
            icon: FaCode,
            title: "2000+ Problems",
            description: "Vast collection of coding challenges from easy to hard difficulty levels",
            color: "blue"
        },
        {
            icon: FaChartLine,
            title: "Live Results",
            description: "Real-time code execution with instant feedback on test cases",
            color: "green"
        },
        {
            icon: FaLaptopCode,
            title: "Monaco Editor",
            description: "Professional code editor with syntax highlighting and IntelliSense",
            color: "blue"
        },
        {
            icon: MdCategory,
            title: "37+ Topics",
            description: "From Arrays to Dynamic Programming, cover all major algorithms",
            color: "yellow"
        },
        {
            icon: FaClock,
            title: "Timed Challenges",
            description: "1-2 hour battles to test your speed and problem-solving skills",
            color: "green"
        }
    ];

    const battleModes = [
        {
            title: "Solo Practice Arena",
            desc: "Sharpen your coding skills in timed solo challenges.",
            image: "/images/solo_mode.jpg"
        },
        {
            title: "1v1 Battle Mode",
            desc: "Compete head-to-head with another coder in real time.",
            image: "/images/1v1_mode.jpg"
        },
        {
            title: "Team Battle",
            desc: "Pair up with friends and take on other teams in epic coding duels.",
            image: "/images/team_mode.jpg"
        },
        {
            title: "Speedrun Challenge",
            desc: "Solve as many problems as you can before time runs out.",
            image: "/images/speedrun_mode.jpg"
        },
        {
            title: "AI Duel Mode",
            desc: "Battle against our AI-powered opponent trained on real coding data.",
            image: "/images/ai_duel.jpg"
        },
        {
            title: "Hackathon Mode",
            desc: "Collaborate or compete in mini hackathons with global coders.",
            image: "/images/hackathon_mode.jpg"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: "border-[#8A2BE2]/40 hover:border-[#8A2BE2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]",
            red: "border-[#FF69B4]/40 hover:border-[#FF69B4] hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]",
            green: "border-[#8A2BE2]/40 hover:border-[#8A2BE2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]",
            purple: "border-[#FF69B4]/40 hover:border-[#FF69B4] hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]",
            yellow: "border-[#8A2BE2]/40 hover:border-[#8A2BE2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]",
            pink: "border-[#FF69B4]/40 hover:border-[#FF69B4] hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]"
        };
        return colors[color];
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black py-20 px-4 relative overflow-hidden">
            {/* Decorative Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #8A2BE2, transparent)' }}></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #FF69B4, transparent)' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: 'radial-gradient(circle, #8A2BE2, #FF69B4, transparent)' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Intro Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-10">
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-[#FF69B4] uppercase tracking-widest font-semibold mb-2">🔥 We Are DevCompete</p>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
                            We Bring <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FF69B4, #8A2BE2)' }}>Coders Together</span><br />To Compete and Grow.
                        </h2>
                        <p className="text-zinc-400 max-w-lg mb-6">
                            DevCompete is where coding meets competition. Engage in real-time battles, face global challengers, and master problem-solving in a gamified coding arena.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#8A2BE2]/20 text-[#8A2BE2]">⚡</span>
                                <div>
                                    <h4 className="font-semibold text-white">Low Latency Environment</h4>
                                    <p className="text-zinc-400 text-sm">Optimized for smooth, real-time coding battles globally.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF69B4]/20 text-[#FF69B4]">💻</span>
                                <div>
                                    <h4 className="font-semibold text-white">AI-Powered Code Evaluation</h4>
                                    <p className="text-zinc-400 text-sm">Judge0 integration for fast, accurate, and fair code testing.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <img
                            src={devimage}
                            alt="Coders competing"
                            className="w-[90%] md:w-[80%] rounded-2xl shadow-[0_0_25px_rgba(255,105,180,0.4)]"
                        />
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="text-center mb-16">
                    <h2 className="russo-one-font text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8A2BE2, #9A40E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Why Choose
                        </span>
                        <span className="text-transparent bg-clip-text ml-3" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Dev Compete?
                        </span>
                    </h2>
                    <p className="text-zinc-300 text-xl max-w-2xl mx-auto">
                        Everything you need for competitive coding practice in one <span className="font-semibold ml-1" style={{ color: '#FF69B4' }}>powerful platform</span>
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`group bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border-2 ${getColorClasses(feature.color)} transition-all duration-300 hover:scale-105`}
                            >
                                <div 
                                    className="text-6xl mb-4 transition-all duration-300 group-hover:scale-110"
                                    style={{ 
                                        color: index % 2 === 0 ? '#8A2BE2' : '#FF69B4',
                                        filter: 'drop-shadow(0 0 10px currentColor)'
                                    }}
                                >
                                    <IconComponent className="w-16 h-16" />
                                </div>
                                <h3 
                                    className="font-bold text-2xl mb-3 transition-colors duration-300"
                                    style={{ 
                                        color: index % 2 === 0 ? '#FF69B4' : '#8A2BE2'
                                    }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* 🎮 Battle Modes Section (like “Available Servers”) */}
                <div className="text-center mb-10">
                    <p className="text-[#FF69B4] uppercase tracking-widest font-semibold mb-2">🚀 Battle Modes</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Available Coding Battle Modes</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Pick your preferred way to compete and challenge others across various game-like coding modes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {battleModes.map((mode, i) => (
                        <div
                            key={i}
                            className="bg-zinc-900/70 border border-zinc-800 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,105,180,0.2)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <img src={mode.image} alt={mode.title} className="w-full h-48 object-cover" />
                            <div className="p-5 text-left">
                                <h3 className="text-xl font-semibold text-white mb-2">{mode.title}</h3>
                                <p className="text-zinc-400 text-sm">{mode.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
