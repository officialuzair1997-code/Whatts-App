import React from 'react';

function SocketPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0e1e25] text-white p-6">
      <div className="w-full max-w-2xl bg-[#1c2a30] rounded-2xl p-8 border border-gray-700 shadow-xl">
        <h1 className="text-2xl font-bold text-green-500 mb-4">Socket Status</h1>
        <p className="text-gray-400">The socket connection is managed globally and connects automatically when you open the app.</p>
        <div className="mt-8 p-4 bg-[#2a3942] rounded-xl border border-gray-600">
           <p className="text-sm font-semibold text-gray-300">Connection: <span className="text-green-500">Active (Auto)</span></p>
        </div>
      </div>
    </div>
  );
}

export default SocketPage;
