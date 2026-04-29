import React from 'react';

function CallUI({ callId, status, isMuted, isVideoOff, duration, onEndCall, onToggleMute, onToggleVideo }) {
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0e1e25] z-50 flex flex-col items-center justify-between p-12 text-white">
      {/* Target User Info */}
      <div className="flex flex-col items-center mt-12 animate-fade-in">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00a884] mb-4 shadow-2xl">
          <img src="https://via.placeholder.com/150" alt="Caller" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-bold mb-2">User {callId?.slice(0,4)}</h2>
        <p className="text-[#00a884] font-medium tracking-widest uppercase text-sm">
          {status === 'ringing' ? 'Ringing...' : status === 'active' ? formatTime(duration) : 'Call Ended'}
        </p>
      </div>

      {/* Video Preview (Mock) */}
      <div className="flex-1 w-full max-w-2xl bg-[#1c2a30] rounded-3xl mt-8 mb-8 relative overflow-hidden border border-gray-700 shadow-inner flex items-center justify-center">
        {isVideoOff ? (
          <div className="flex flex-col items-center text-gray-500">
             <span className="text-4xl mb-2">📷</span>
             <p>Camera is off</p>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-sm font-medium">Your Preview</p>
          </div>
        )}
        {!isVideoOff && <div className="absolute top-4 right-4 w-32 h-44 bg-black rounded-xl border border-gray-600 shadow-lg" />}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mb-12">
        <button 
          onClick={onToggleMute}
          className={`p-5 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-[#2a3942] hover:bg-[#374248]'}`}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        
        <button 
          onClick={onEndCall}
          className="p-6 bg-red-600 hover:bg-red-700 rounded-full text-3xl shadow-lg transform active:scale-90 transition-all"
        >
          📞
        </button>

        <button 
          onClick={onToggleVideo}
          className={`p-5 rounded-full transition-all ${isVideoOff ? 'bg-white text-black' : 'bg-[#2a3942] hover:bg-[#374248]'}`}
        >
          {isVideoOff ? '📹' : '🎥'}
        </button>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default CallUI;
