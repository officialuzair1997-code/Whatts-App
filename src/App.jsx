import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import socketService from './services/socket';

function App() {
  useEffect(() => {
    // Automatically connect to the socket on app mount
    socketService.connect();

    return () => {
      // Clean up connection on unmount
      socketService.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
