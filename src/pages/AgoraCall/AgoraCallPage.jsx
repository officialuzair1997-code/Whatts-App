import React, { useEffect, useState, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useParams, useNavigate } from 'react-router-dom';
import { AGORA_CONFIG } from './agoraConfig';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

function AgoraCallPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [status, setStatus] = useState('joining'); // joining, active, ended

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const initAgora = async () => {
      try {
        await client.join(AGORA_CONFIG.appId, AGORA_CONFIG.channel, AGORA_CONFIG.token || null, null);
        
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        
        await client.publish([audioTrack, videoTrack]);
        setStatus('active');

        if (localVideoRef.current) {
          videoTrack.play(localVideoRef.current);
        }

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setRemoteUsers(prev => [...prev.filter(u => u.uid !== user.uid), user]);
          }
          if (mediaType === 'audio') {
            user.audioTrack.play();
          }
        });

        client.on('user-unpublished', (user) => {
          setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
        });

      } catch (err) {
          console.error('Agora init failed:', err);
          setStatus('error');
      }
    };

    initAgora();

    return () => {
      localAudioTrack?.close();
      localVideoTrack?.close();
      client.leave();
    };
  }, []);

  useEffect(() => {
     if (remoteUsers.length > 0 && remoteVideoRef.current) {
        remoteUsers[0].videoTrack.play(remoteVideoRef.current);
     }
  }, [remoteUsers]);

  const handleEndCall = async () => {
    localAudioTrack?.close();
    localVideoTrack?.close();
    await client.leave();
    setStatus('ended');
    setTimeout(() => navigate(-1), 1000);
  };

  const toggleMute = () => {
    if (localAudioTrack) {
        localAudioTrack.setEnabled(isMuted);
        setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
        localVideoTrack.setEnabled(isVideoOff);
        setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0e1e25] z-50 flex flex-col items-center justify-between p-12 text-white">
      {/* Header Info */}
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-3xl font-bold mb-1">Agora Call</h2>
        <p className="text-[#00a884] uppercase tracking-widest text-xs font-bold">
          {status === 'active' ? 'Live Connection' : status === 'joining' ? 'Connecting...' : 'Call Ended'}
        </p>
      </div>

      {/* Video Streams */}
      <div className="flex-1 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
         {/* Local Stream */}
         <div className="relative bg-[#1c2a30] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center">
            <div ref={localVideoRef} className="w-full h-full object-cover" />
            {isVideoOff && <div className="absolute inset-0 bg-[#1c2a30] flex items-center justify-center text-4xl">📷 Off</div>}
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs">You</div>
         </div>

         {/* Remote Stream */}
         <div className="relative bg-[#1c2a30] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center">
            {remoteUsers.length > 0 ? (
                <div ref={remoteVideoRef} className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                    <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse mb-4" />
                    <p>Waiting for recipient...</p>
                </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs">Remote User</div>
         </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mb-12 animate-slide-up">
        <button onClick={toggleMute} className={`p-5 rounded-full transition-all ${isMuted ? 'bg-white text-blackScale-110' : 'bg-[#2a3942] hover:bg-[#374248]'}`}>
          {isMuted ? '🔇' : '🎤'}
        </button>
        <button onClick={handleEndCall} className="p-6 bg-red-600 hover:bg-red-700 rounded-full text-3xl shadow-xl transform active:scale-95 transition-all">
          📞
        </button>
        <button onClick={toggleVideo} className={`p-5 rounded-full transition-all ${isVideoOff ? 'bg-white text-black' : 'bg-[#2a3942] hover:bg-[#374248]'}`}>
          {isVideoOff ? '📹' : '🎥'}
        </button>
      </div>

      <style>{`
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

export default AgoraCallPage;
