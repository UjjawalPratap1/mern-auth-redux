import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Main = () => {
 const user = useSelector((store)=>store.app.user);
 const navigate = useNavigate();
  useEffect(() => {
      if (!user) {
        navigate('/');
      }
      
    }, [user, navigate]);
  
  
  return (
    
    <div className="flex justify-center my-[18%]">
      <h1 className="font-bold ">Main Page</h1>
    </div>
  )
}

export default Main
