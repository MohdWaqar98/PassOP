import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 lg:px-40 h-12">
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        <div className="flex items-center gap-4">

          <a
            href="https://github.com/MohdWaqar98"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-700 rounded-full flex items-center ring-1 ring-white px-2 py-1 hover:bg-green-600 transition-all"
          >
            <img className="invert w-6 p-1" src="icons/github.svg" alt="GitHub" />
            <span className="font-bold px-1 text-sm hidden sm:inline">GitHub</span>
          </a>

          {isLoggedIn && (
            <button onClick={handleLogout} className="flex items-center">
              <lord-icon
                src="https://cdn.lordicon.com/vfiwitrm.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#16c72e"
                style={{ width: "32px", height: "32px" }}
              ></lord-icon>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
