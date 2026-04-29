import React from 'react';

function UpdatePassword({ onNext }) {
  return (
    <div className="p-8 bg-[#1c2a30] rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">New Password</h2>
      <p className="text-gray-400 mb-6 text-sm">Please set a strong password.</p>
      <input 
        type="password" 
        placeholder="New Password" 
        className="w-full px-4 py-2 bg-[#2a3942] rounded-lg text-white mb-3 focus:outline-none border border-transparent focus:border-green-500"
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        className="w-full px-4 py-2 bg-[#2a3942] rounded-lg text-white mb-6 focus:outline-none border border-transparent focus:border-green-500"
      />
      <button 
        onClick={onNext}
        className="w-full bg-[#00a884] hover:bg-[#008f6f] text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Update Password
      </button>
    </div>
  );
}

export default UpdatePassword;
