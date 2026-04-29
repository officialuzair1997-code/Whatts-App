import React, { useState } from 'react';
import Profile from '../../components/profile/Profile';

function ProfilePage() {
  // Logic for profile management
  const [userData, setUserData] = useState({
    name: 'John Doe',
    about: 'Hey there! I am using WhatsUp.',
    phone: '+1 234 567 890',
    profilePic: 'https://via.placeholder.com/150'
  });

  const handleUpdateProfile = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
    console.log("Profile updated:", newData);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0e1e25]">
      <Profile 
        userData={userData} 
        onUpdate={handleUpdateProfile} 
      />
    </div>
  );
}

export default ProfilePage;
