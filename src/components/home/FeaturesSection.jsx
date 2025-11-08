import { IoSettingsSharp } from "react-icons/io5";
import { FaCode, FaChartLine, FaClock, FaLaptopCode, FaTrophy } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

function FeaturesSection() {
<<<<<<< HEAD
  const features = [
    {
      icon: IoSettingsSharp,
      title: "Custom Room Settings",
      description:
        "Choose number of problems, difficulty levels, topics, and battle duration",
      color: "blue",
    },
    {
      icon: FaCode,
      title: "2000+ Problems",
      description:
        "Vast collection of coding challenges from easy to hard difficulty levels",
      color: "blue",
    },
    {
      icon: FaChartLine,
      title: "Live Results",
      description:
        "Real-time code execution with instant feedback on test cases",
      color: "green",
    },
    {
      icon: FaLaptopCode,
      title: "Monaco Editor",
      description:
        "Professional code editor with syntax highlighting and IntelliSense",
      color: "blue",
    },
    {
      icon: MdCategory,
      title: "37+ Topics",
      description:
        "From Arrays to Dynamic Programming, cover all major algorithms",
      color: "yellow",
    },
    {
      icon: FaClock,
      title: "Timed Challenges",
      description:
        "1-2 hour battles to test your speed and problem-solving skills",
      color: "green",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-500/30 hover:border-blue-500 group-hover:text-blue-400",
      red: "border-red-500/30 hover:border-red-500 group-hover:text-red-400",
      green:
        "border-green-500/30 hover:border-green-500 group-hover:text-green-400",
      purple:
        "border-purple-500/30 hover:border-purple-500 group-hover:text-purple-400",
      yellow:
        "border-yellow-500/30 hover:border-yellow-500 group-hover:text-yellow-400",
      pink: "border-pink-500/30 hover:border-pink-500 group-hover:text-pink-400",
    };
    return colors[color];
  };

  return (
    <section className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Why Choose LeetCompete?
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
            Everything you need for competitive coding practice in one platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-zinc-900 p-8 rounded-xl border-2 ${getColorClasses(
                  feature.color
                )} transition-all hover:scale-105 hover:shadow-2xl`}
              >
                <div className="text-white text-6xl mb-4 transition-transform group-hover:scale-110">
                  <IconComponent className="w-16 h-16" />
=======
    const features = [
        {
            icon: IoSettingsSharp,
            title: "Custom Room Settings",
            description: "Set problem difficulty, topics, and battle duration.",
            color: "text-blue-400"
        },
        {
            icon: FaCode,
            title: "2000+ Problems",
            description: "Vast collection of coding challenges from easy to hard.",
            color: "text-green-400"
        },
        {
            icon: FaLaptopCode,
            title: "Live Monaco Editor",
            description: "Professional editor with syntax highlighting and IntelliSense.",
            color: "text-sky-400"
        },
        {
            icon: FaChartLine,
            title: "Real-Time Results",
            description: "Instant feedback on test cases as you submit.",
            color: "text-orange-400"
        },
        {
            icon: MdCategory,
            title: "37+ Topics",
            description: "From Arrays to Dynamic Programming, cover all major algorithms.",
            color: "text-purple-400"
        },
        {
            icon: FaTrophy,
            title: "Leaderboards",
            description: "Track your rank and compete for the top spot.",
            color: "text-yellow-400"
        }
    ];

    return (
        <section className="bg-zinc-950 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-4">
                        Why Choose Dev Dual?
                    </h2>
                    <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                        Everything you need for competitive coding practice in one platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-zinc-900 p-8 rounded-xl border-2 border-zinc-800 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
                            >
                                <div className={`text-6xl mb-6 ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <IconComponent className="w-16 h-16" />
                                </div>
                                <h3 className="text-white font-bold text-2xl mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
>>>>>>> 96ebb74ca2e5179d06744324ce57cab297d2692d
                </div>
                <h3 className="text-white font-bold text-2xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;