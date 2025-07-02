import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 lg:px-40 h-12">
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/MohdWaqar98"  // 🔗 apna GitHub link yahaan lagao
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-green-700 rounded-full flex items-center ring-1 ring-white px-2 py-1 hover:bg-green-600 transition-all"
        >
          <img className="invert w-6 p-1" src="icons/github.svg" alt="GitHub" />
          <span className="font-bold px-1 text-sm hidden sm:inline">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
