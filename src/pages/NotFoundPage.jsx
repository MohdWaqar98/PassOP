import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[81.5vh] flex flex-col items-center justify-center bg-slate-800 text-white px-4">
      <h1 className="text-6xl font-bold text-green-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-green-200 mb-2">Page Not Found</p>
      <p className="text-md text-gray-300 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition-all duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
