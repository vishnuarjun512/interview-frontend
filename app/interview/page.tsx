"use client";
import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const InterviewPage: React.FC = () => {
  const [question, setQuestion] = useState<string>(""); // Current question from backend
  const [answer, setAnswer] = useState<string>(""); // Current converted answer
  const [isRecording, setIsRecording] = useState<boolean>(false); // Recording state
  const [recognition, setRecognition] = useState<any>(null); // SpeechRecognition instance

  useEffect(() => {
    // Safely access SpeechRecognition API
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in your browser.");
      return;
    }

    const recogInstance = new SpeechRecognition();
    recogInstance.continuous = false;
    recogInstance.interimResults = false;
    recogInstance.lang = "en-US";

    recogInstance.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript); // Save the converted text
      sendAnswerToBackend(transcript); // Send to backend
    };

    recogInstance.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognition(recogInstance);
    fetchNextQuestion(); // Fetch the first question on load
  }, []);

  // Fetch the next question from the backend
  const fetchNextQuestion = async () => {
    try {
      const res = await fetch("/api/interview/question"); // Update with your API endpoint
      const data = await res.json();
      setQuestion(data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Send the user's answer to the backend
  const sendAnswerToBackend = async (transcript: string) => {
    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: transcript }),
      });
      const data = await res.json();

      if (data.nextQuestion) {
        setQuestion(data.nextQuestion); // Load the next question
      }
    } catch (error) {
      console.error("Error sending answer:", error);
    }
  };

  // Start or stop the recording
  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-6">Interview Simulator</h1>

      {/* Display the Question */}
      <div className="text-lg font-semibold mb-6 bg-white p-4 shadow rounded w-2/3 text-center">
        {question ? question : "Loading question..."}
      </div>

      {/* Controls */}
      <button
        onClick={toggleRecording}
        className={`px-6 py-3 rounded text-white ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Answering"}
      </button>

      {/* Answer Preview */}
      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Your Answer:</h2>
        <p className="text-gray-600">
          {answer || "Your response will appear here..."}
        </p>
      </div>
    </div>
  );
};

export default InterviewPage;
