import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const StartInterview = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const videoRefAI = useRef(null);
  const videoRefClient = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  // Request access to camera and microphone when component mounts
  useEffect(() => {
    requestMediaAccess();
  }, []);

  // Request access to camera and microphone
  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);

      if (videoRefClient.current) {
        videoRefClient.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Toggle audio state
  const toggleAudio = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled((prevState) => !prevState);
    }
  };

  // Toggle video state
  const toggleVideo = () => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled((prevState) => !prevState);
    }
  };

  // End the meeting: stop all tracks and navigate to home
  const endMeeting = () => {
    if (mediaStream) {
      // Stop all media tracks
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    // Navigate to home page
    navigate("/");  // Change "/" to the appropriate home route in your app
  };

  // Clean up media stream on component unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-between p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Meeting</h2>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-gray-700 rounded">Show Stats</button>
          <button className="px-2 py-1 bg-gray-700 rounded">📷</button>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* AI Video */}
        <div className="flex-1 bg-gray-900 relative flex items-center justify-center rounded-md">
          <video
            ref={videoRefAI}
            autoPlay
            muted
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-50 rounded">
            <p>AI</p>
          </div>
        </div>

        {/* Client Video */}
        <div className="flex-1 bg-gray-900 relative flex items-center justify-center rounded-md">
          <video
            ref={videoRefClient}
            autoPlay
            muted={!isAudioEnabled}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-50 rounded">
            <p>Client</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={toggleAudio}
          className={`px-4 py-2 rounded-full ${isAudioEnabled ? "bg-green-500" : "bg-red-500"}`}
        >
          {isAudioEnabled ? "Mute" : "Unmute"}
        </button>
        <button
          onClick={toggleVideo}
          className={`px-4 py-2 rounded-full ${isVideoEnabled ? "bg-green-500" : "bg-red-500"}`}
        >
          {isVideoEnabled ? "Disable Video" : "Enable Video"}
        </button>
        <button
          onClick={endMeeting}
          className="px-4 py-2 bg-red-500 rounded-full"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default StartInterview;
