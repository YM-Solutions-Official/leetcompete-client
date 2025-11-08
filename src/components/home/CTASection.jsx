import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-black py-28 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 flex justify-center items-center">
       
        <div className="w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[150px] absolute top-40 right-1/3"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Ready to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
            Prove Your Skills
          </span>
          ?
        </h2>

        <p className="text-zinc-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of developers in the ultimate coding arena. Create a
          room, challenge a friend, and start your duel now.
        </p>

        <button
          onClick={() => navigate("/battle")}
          className="group relative px-14 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-xl shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
        >
          ⚡ Start Battling Now
          <span className="absolute inset-0 rounded-xl border border-blue-400/30 group-hover:border-blue-400/60 transition-all"></span>
        </button>
      </div>
    </section>
  );
}

export default CTASection;
