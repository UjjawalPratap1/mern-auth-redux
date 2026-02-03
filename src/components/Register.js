import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { API_END_POINT } from "../utils/constants";


export default function Register() {
  const [isLogin , setIsLogin]= useState(false);
  const [password, setPassword] = useState("");
  const [email , setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const loginHandler = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setMessage("");
    if(isLogin){
       try {
      const user = { email, password};
      const res = await axios.post(`${API_END_POINT}/login` ,user)
      setMessage("Login successful!");
      setMessageType("success");
      console.log(res); 
      setUsername("");
      setEmail("");
      setPassword("");
       console.log("User data to dispatch:", res.data.user);
              dispatch(setUser(res.data.user));
      navigate("/main");
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message || "Login failed";
      setMessage(errorMsg);
      setMessageType("error");
      // Don't log error to console to avoid confusion - message is displayed to user
      if(error.response?.status !== 401) {
        console.error("Login error:", error);
      }
    }
    }
    else{
      // Register
      try {
        const user = {username, email , password};
        const res = await axios.post(`${API_END_POINT}/register` ,user)
        setMessage(res.data.msg || "Registration successful!");
        setMessageType("success");
        console.log(res.config.data);
        setUsername("");
        setEmail("");
        setPassword("");
        setIsLogin(true);
      } catch (error) {
        const errorMsg = error.response?.data?.msg || error.message || "Registration failed";
        setMessage(errorMsg);
        setMessageType("error");
        
        // Don't log error to console to avoid confusion - message is displayed to user
        if(error.response?.status !== 409) {
          console.error("Registration error:", error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-[380px] text-white border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
         {isLogin ? "Login":"Register"}
        </h2>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${messageType === "success" ? "bg-green-500/20 border border-green-500 text-green-400" : "bg-red-500/20 border border-red-500 text-red-400"}`}>
            {message}
          </div>
        )}

       
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}

          {!isLogin && 
          <div>
            <label className="block mb-2 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          }
          

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
               value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
          >
            {!isLogin ? "Login":"Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-300">
       
          {isLogin?"Don't have a account?":"Already hava a account?"}
          <span onClick={loginHandler} className="text-blue-400 cursor-pointer">{!isLogin ? "Login":"Register"}</span>
        </p>
      </div>
    </div>
  );
}
