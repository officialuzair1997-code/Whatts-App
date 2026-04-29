import React from 'react';

function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0e1e25] text-white">
      <div className="p-8 bg-[#1c2a30] rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
            <input 
              type="text" 
              placeholder="+1 234 567 890" 
              className="w-full px-4 py-2 bg-[#2a3942] rounded-lg text-white focus:outline-none border border-transparent focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2 bg-[#2a3942] rounded-lg text-white focus:outline-none border border-transparent focus:border-green-500 transition-colors"
            />
          </div>
          <button className="w-full bg-[#00a884] hover:bg-[#008f6f] text-white font-semibold py-2 rounded-lg transition-colors mt-4">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Not a member? <span className="text-green-500 cursor-pointer">Sign up now</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
