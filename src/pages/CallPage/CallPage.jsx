import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CallUI from '../../components/Call/CallUI';

function CallPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState('ringing'); // ringing, active, ended
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timer;
    if (callStatus === 'active') {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  useEffect(() => {
    // Mock auto-connect after 3 seconds
    const timeout = setTimeout(() => {
      setCallStatus('active');
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);

  return (
    <CallUI 
      callId={id}
      status={callStatus}
      isMuted={isMuted}
      isVideoOff={isVideoOff}
      duration={duration}
      onEndCall={handleEndCall}
      onToggleMute={toggleMute}
      onToggleVideo={toggleVideo}
    />
  );
}

export default CallPage;
