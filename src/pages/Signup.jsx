import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.jpg";
import axios from "axios";
import { serverURL } from "../App";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useUser } from "../context/UserContext";

function Signup() {
  const { setUserData } = useUser();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleShowChange = () => {
    setShow(!show);
  };
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDetailsChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        serverURL + "/auth/signup",
        {
          name: details.name,
          email: details.email,
          password: details.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      setUserData(res.data);
      setLoading(false);
      toast.success(`Welcome, ${res.data.name}! Signup Successful`);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      {/* Left vertical line */}
      <div className="hidden lg:block fixed left-8 xl:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-600 to-transparent z-10"></div>
      
      {/* Right vertical line */}
      <div className="hidden lg:block fixed right-8 xl:right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-600 to-transparent z-10"></div>
      
      <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl lg:rounded-2xl flex flex-col lg:flex-row overflow-hidden relative z-10">
        <div className="flex-1 lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <button
            onClick={() => navigate("/")}
            className="absolute top-1 right-10 sm:top-6 sm:right-6 px-3 py-2 sm:px-4 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-lg font-medium transition-all border border-zinc-600 flex items-center gap-2 backdrop-blur-sm text-sm sm:text-base z-20"
         >
           <span className="hidden sm:inline">Return to Home</span><span className="sm:hidden">Home</span> <span>→</span>
         </button>
          <div className="text-center lg:text-left mb-6">
            <h1 className="font-bold text-zinc-800 text-xl sm:text-2xl lg:text-3xl mb-1">
              Let's get started
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base">Create your account and start competing</p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            className="w-full max-w-md mx-auto lg:mx-0 h-10 bg-white border-2 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm">Continue with Google</span>
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-zinc-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full h-10 px-3 border-2 border-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg text-zinc-800 placeholder-zinc-400 transition-all duration-200 outline-none text-sm"
                placeholder="Enter your full name"
                name="name"
                value={details.name}
                onChange={handleDetailsChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full h-10 px-3 border-2 border-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg text-zinc-800 placeholder-zinc-400 transition-all duration-200 outline-none text-sm"
                placeholder="Enter your email address"
                name="email"
                value={details.email}
                onChange={handleDetailsChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  className="w-full h-10 px-3 pr-10 border-2 border-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-lg text-zinc-800 placeholder-zinc-400 transition-all duration-200 outline-none text-sm"
                  placeholder="Choose a strong password"
                  name="password"
                  value={details.password}
                  onChange={handleDetailsChange}
                  required
                />
                <button
                  type="button"
                  onClick={handleShowChange}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {show ? (
                    <IoEye className="w-4 h-4" />
                  ) : (
                    <IoEyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-400 disabled:to-zinc-500 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] disabled:transform-none text-sm mt-5"
            >
              {loading ? (
                <>
                  <ClipLoader size={16} color="white" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Start Your Journey"
              )}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-zinc-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
        
        {/* Right side - Brand showcase */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-zinc-600 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-zinc-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-zinc-700 rounded-full opacity-10"></div>
          
          <div className="flex flex-col items-center justify-center p-8 text-center relative z-10">
            <div className="mb-6">
              <img 
                src={logo} 
                alt="LeetCompete Logo" 
                className="w-20 h-20 rounded-xl shadow-2xl border-2 border-white/20 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-3">Welcome to LeetCompete</h2>
              <p className="text-zinc-300 text-base leading-relaxed max-w-sm">
                Join thousands of developers improving their coding skills through competitive programming
              </p>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-xs">⚡</span>
                </div>
                <span className="text-sm">Real-time 1v1 Coding Battles</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-xs">🎯</span>
                </div>
                <span className="text-sm">2500+ Problems for Practice</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">📊</span>
                </div>
                <span className="text-sm">Track Your Progress & Stats</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-200">
                <div className="w-7 h-7 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 text-xs">🏆</span>
                </div>
                <span className="text-sm">Compete & Improve Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
