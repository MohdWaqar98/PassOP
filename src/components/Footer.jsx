import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-white flex flex-col justify-center items-center py-4 px-4 w-full'>
      <div className="logo font-bold text-2xl text-white mb-1">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </div>
      
      <div className='flex items-center text-sm text-center'>
        Created with 
        <img className='w-5 mx-2' src="icons/icons8-heart-96.png" alt="heart" />
        by <span className='ml-1 font-medium'>Waqar</span>
      </div>
    </footer>
  );
};

export default Footer;
