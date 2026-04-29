import React from 'react';

function SendOTP({ onNext }) {
  return (
    <div className="p-8 bg-[#1c2a30] rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Verify OTP</h2>
      <p className="text-gray-400 mb-6 text-sm">We've sent a 6-digit code to your email.</p>
      <div className="flex gap-2 mb-6 justify-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <input 
            key={i}
            type="text" 
            maxLength="1"
            className="w-10 h-10 text-center bg-[#2a3942] rounded-lg text-white font-bold focus:outline-none border border-transparent focus:border-green-500"
          />
        ))}
      </div>
      <button 
        onClick={onNext}
        className="w-full bg-[#00a884] hover:bg-[#008f6f] text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Verify OTP
      </button>
    </div>
  );
}

export default SendOTP;
