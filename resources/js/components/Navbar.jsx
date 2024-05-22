import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthApis from '../apis/AuthApis';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleNav = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = AuthApis.logout();
            if (res) {
                localStorage.removeItem('email');
                localStorage.removeItem('name');
                localStorage.removeItem('token');
                navigate('/login')

            }
      }
    });
  };

  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="max-w-80 md:max-w-7xl mx-auto flex justify-between items-center">
        <a href='/' className="text-white font-bold my-4 no-underline">Inventory Management</a>
        <div className="my-4">
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={handleToggleNav}
          >
            {showNavLinks ? "x" : "="}
          </button>
          <div className={`md:flex ${showNavLinks ? "block" : "hidden"}`}>
            <Link to='/' className={`text-slate-200 mx-4 no-underline ${location.pathname === '/' ? '!text-white' : ''}`}>
              Dashboard
            </Link>
            <Link to='/category' className={`text-slate-200 mx-4 no-underline ${location.pathname === '/category' ? '!text-white' : ''}`}>
              Transactions
            </Link>
            <button onClick={handleLogout} className="bg-white text-black font-semibold mx-4 p-1 rounded no-underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
