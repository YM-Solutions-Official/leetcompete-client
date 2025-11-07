import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import video1 from "../../assets/video1.mp4";

function HeroSection() {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState("");
    const fullText = "Dev Compete";
    const typingSpeed = 100; // milliseconds per character

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

    return (
        <section className="min-h-screen relative flex items-center justify-center px-4 pt-20 overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Light overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            
            {/* Subtle gradient overlay to enhance the color scheme */}
            <div 
                className="absolute inset-0 z-20" 
                style={{ 
                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(255, 105, 180, 0.05), rgba(0, 0, 0, 0.1))' 
                }}
            ></div>
            
            <div className="max-w-6xl mx-auto text-center relative z-30">
                <h1 className="russo-one-font text-6xl md:text-8xl font-bold mb-4 min-h-[100px] md:min-h-[120px]">
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8A2BE2, #9A40E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {displayedText.slice(0, 4)}
                    </span>
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {displayedText.slice(4)}
                    </span>
                    <span className="animate-pulse" style={{ color: '#FF69B4' }}>|</span>
                </h1>
                <p className="text-zinc-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                    Challenge developers worldwide. Compete in real-time coding battles. 
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={() => navigate('/battle')}
                        className="group relative px-8 py-4 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-2xl hover:scale-105 w-64"
                        style={{ 
                            background: 'linear-gradient(135deg, #8A2BE2, #9A40E8)',
                            boxShadow: '0 8px 25px rgba(138, 43, 226, 0.3)' 
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.boxShadow = '0 12px 30px rgba(138, 43, 226, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.3)';
                        }}
                    >
                        <span className="relative z-10">🚀 Create Room</span>
                    </button>

                    <button
                        onClick={() => navigate('/join-room')}
                        className="px-8 py-4 bg-zinc-900 text-white rounded-lg font-bold text-lg border-2 transition-all shadow-lg hover:shadow-2xl hover:scale-105 w-64"
                        style={{ 
                            borderColor: '#FF69B4',
                            boxShadow: '0 8px 25px rgba(255, 105, 180, 0.3)' 
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#FF69B4';
                            e.target.style.color = 'black';
                            e.target.style.boxShadow = '0 12px 30px rgba(255, 105, 180, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#18181b';
                            e.target.style.color = 'white';
                            e.target.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.3)';
                        }}
                    >
                        ⚔️ Join Room
                    </button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div 
                        className="bg-zinc-900 p-6 rounded-lg border-2 transition-all hover:scale-105 duration-300"
                        style={{ borderColor: '#8A2BE2', boxShadow: '0 4px 15px rgba(138, 43, 226, 0.2)' }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#FF69B4';
                            e.target.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#8A2BE2';
                            e.target.style.boxShadow = '0 4px 15px rgba(138, 43, 226, 0.2)';
                        }}
                    >
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="font-bold text-xl mb-2" style={{ color: '#8A2BE2' }}>Real-Time Battles</h3>
                        <p className="text-zinc-400 text-sm">Compete with developers in live coding challenges</p>
                    </div>
                    <div 
                        className="bg-zinc-900 p-6 rounded-lg border-2 transition-all hover:scale-105 duration-300"
                        style={{ borderColor: '#FF69B4', boxShadow: '0 4px 15px rgba(255, 105, 180, 0.2)' }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#8A2BE2';
                            e.target.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#FF69B4';
                            e.target.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.2)';
                        }}
                    >
                        <div className="text-4xl mb-3">🏆</div>
                        <h3 className="font-bold text-xl mb-2" style={{ color: '#FF69B4' }}>Track Progress</h3>
                        <p className="text-zinc-400 text-sm">Monitor your performance and improve your skills</p>
                    </div>
                    <div 
                        className="bg-zinc-900 p-6 rounded-lg border-2 transition-all hover:scale-105 duration-300"
                        style={{ borderColor: '#8A2BE2', boxShadow: '0 4px 15px rgba(138, 43, 226, 0.2)' }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#FF69B4';
                            e.target.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#8A2BE2';
                            e.target.style.boxShadow = '0 4px 15px rgba(138, 43, 226, 0.2)';
                        }}
                    >
                        <div className="text-4xl mb-3">💻</div>
                        <h3 className="font-bold text-xl mb-2" style={{ color: '#8A2BE2' }}>Multiple Languages</h3>
                        <p className="text-zinc-400 text-sm">Code in C++, Java, Python, or JavaScript</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
