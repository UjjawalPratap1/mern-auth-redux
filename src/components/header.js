import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';


const Header = () => {
   const user = useSelector((store)=>store.app.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const handleLogout = () => {
     dispatch(clearUser());
     navigate("/");
   };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide text-blue-400">
            StrangerHere
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-8 text-lg">
           {user ? (
            <>
              <span className="text-green-400 font-semibold">{user?.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
              >
                Logout
              </button>
            </>
           ) : (
            <>
              <a href="/" className="hover:text-blue-400 transition">About</a>
              <a href="/" className="hover:text-blue-400 transition">Contact Us</a>
            </>
           )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
