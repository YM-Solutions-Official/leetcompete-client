import { IoSettingsSharp } from "react-icons/io5";
import { FaCode, FaChartLine, FaLaptopCode, FaTrophy } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

function FeaturesSection() {
  const features = [
    {
      icon: IoSettingsSharp,
      title: "Custom Room Settings",
      description:
        "Choose number of problems, difficulty levels, topics, and battle duration.",
      color: "blue", // core brand color
    },
    {
      icon: FaCode,
      title: "2800+ Problems",
      description:
        "Vast collection of coding challenges from easy, medium to hard difficulty levels.",
      color: "orange", // adds warm tone variation
    },
    {
      icon: FaChartLine,
      title: "Live Results",
      description: "View real-time results and progress tracking.",
      color: "green",
    },
    {
      icon: FaLaptopCode,
      title: "Monaco Editor",
      description:
        "Professional code editor with syntax highlighting and IntelliSense.",
      color: "purple", // cooler accent instead of another blue
    },
    {
      icon: MdCategory,
      title: "37+ Topics",
      description:
        "Covering a wide range of topics to enhance your coding skills.",
      color: "yellow",
    },
    {
      icon: FaTrophy,
      title: "Leaderboards",
      description:
        "Get your global ranking and compete with the top coders.",
      color: "red", // energetic contrast for finale
    },
  ];

  const getClasses = (color) => {
    switch (color) {
      case "green":
        return "border-green-500/30 hover:border-green-500 hover:shadow-green-500/20 group-hover:text-green-400";
      case "yellow":
        return "border-yellow-500/30 hover:border-yellow-500 hover:shadow-yellow-500/20 group-hover:text-yellow-400";
      case "purple":
        return "border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/20 group-hover:text-purple-400";
      case "red":
        return "border-red-500/30 hover:border-red-500 hover:shadow-red-500/20 group-hover:text-red-400";
      case "orange":
        return "border-orange-500/30 hover:border-orange-500 hover:shadow-orange-500/20 group-hover:text-orange-400";
      default:
        return "border-blue-500/30 hover:border-blue-500 hover:shadow-blue-500/20 group-hover:text-blue-400";
    }
  };

  return (
    <section className="bg-zinc-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Why Choose DevCompete?
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
            Gamified Learning Experience for Competitive Programmers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-zinc-900 p-8 rounded-xl border-2 ${getClasses(
                  feature.color
                )} transition-all duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-br hover:from-zinc-900 hover:to-zinc-950`}
              >
                <div className="text-white text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-16 h-16" />
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
