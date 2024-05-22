import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";

const Auth = () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  return token ?
  <>
    <Navbar />
    <div className="flex">
        <Sidenav />
        <div className="flex-grow">
            <Outlet />
        </div>
    </div>
    <Footer />
  </>
    : <Navigate to="/login" />;
};

export default Auth;