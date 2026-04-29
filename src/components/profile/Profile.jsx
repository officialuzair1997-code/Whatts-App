import React from 'react';

function Profile({ userData, onUpdate }) {
  return (
    <div className="flex-1 flex flex-col bg-[#0e1e25] text-white">
      <header className="p-6 bg-[#1c2a30] border-b border-gray-700 flex items-center gap-4">
        <h1 className="text-xl font-bold">Profile</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        <div className="relative group mb-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#00a884]">
            <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-xs font-bold">CHANGE PHOTO</span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="bg-[#1c2a30] p-4 rounded-xl">
            <label className="block text-sm text-green-500 mb-1">Your Name</label>
            <div className="flex justify-between items-center">
              <input 
                type="text" 
                value={userData.name} 
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="bg-transparent border-none focus:outline-none text-white w-full"
              />
              <button className="text-gray-400 hover:text-white">✏️</button>
            </div>
          </div>

          <div className="bg-[#1c2a30] p-4 rounded-xl">
            <label className="block text-sm text-green-500 mb-1">About</label>
            <div className="flex justify-between items-center">
              <input 
                type="text" 
                value={userData.about} 
                onChange={(e) => onUpdate({ about: e.target.value })}
                className="bg-transparent border-none focus:outline-none text-white w-full"
              />
              <button className="text-gray-400 hover:text-white">✏️</button>
            </div>
          </div>

          <div className="bg-[#1c2a30] p-4 rounded-xl">
            <label className="block text-sm text-green-500 mb-1">Phone</label>
            <p className="text-gray-400">{userData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
