import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="layout-wrapper min-h-screen bg-[#0e1e25]">
      {/* Global Navbar or Sidebar could go here */}
      <main className="h-full w-full">
        <Outlet />
      </main>
      {/* Global Footer could go here */}
    </div>
  );
}

export default MainLayout;
