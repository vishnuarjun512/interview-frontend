// import React, { useState } from "react";
// import ResumeScanner from "./ResumeScanner";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [uploaded, setUploaded] = useState(false);
//   const [skills, setSkills] = useState([]);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [resumeData, setResumeData] = useState({});

//   const extractSkillsFromResume = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const content = reader.result;
//         const extractedSkills = content.includes("JavaScript")
//           ? ["JavaScript", "React.js", "Node.js", "CSS"]
//           : ["Skills not detected"];
//         resolve(extractedSkills);
//       };
//       reader.onerror = () => reject("Failed to read the file");
//       reader.readAsText(file);
//     });
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file || file.type !== "application/pdf") {
//       setMessage("Please upload a valid PDF file.");
//       return;
//     }

//     setAnalyzing(true);
//     setMessage("");
//     try {
//       const extractedSkills = await extractSkillsFromResume(file);
//       setSkills(extractedSkills);
//       setUploaded(true);
//     } catch (err) {
//       setMessage(err);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const handleCancel = () => {
//     setUploaded(false);
//     setSkills([]);
//     setMessage("");
//     setResumeData({});
//   };

//   const handleStartInterview = () => {
//     window.open("/interview", "_blank"); // Open the interview page in a new tab
//   };

//   return (
//     <section className="flex flex-row min-h-screen w-full">
//       {/* Left Content */}
//       <div className="w-1/2 flex flex-col justify-center p-12 bg-gradient-to-r from-green-200 to-green-50">
//         {!uploaded ? (
//           <div className="text-center">
//             <h2 className="text-4xl font-bold mb-4">
//               Smarter AI Interviews, Redefining Careers with{" "}
//               <span className="text-green-500">KickBegin</span>
//             </h2>
//             <p className="mb-6 text-gray-600">
//               Upload your resume to start analyzing your potential!
//             </p>
//             <button
//               onClick={() => document.getElementById("fileInput").click()}
//               className="px-6 py-3 font-semibold bg-green-500 text-white rounded-lg"
//             >
//               Upload Resume
//             </button>
//             <input
//               id="fileInput"
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileUpload}
//               style={{ display: "none" }}
//             />
//             {message && <p className="mt-4 text-red-500">{message}</p>}
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h2 className="text-xl font-bold mb-4">Resume Analysis</h2>
//             {analyzing ? (
//               <p className="text-gray-600">Analyzing your resume...</p>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold mb-2">
//                   Extracted Skills:
//                 </h3>
//                 <ul className="list-disc pl-6">
//                   {skills.map((skill, index) => (
//                     <li key={index} className="text-green-500">
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//                 {/* Resume Scanner Component */}
//                 <ResumeScanner onExtractedData={setResumeData} />
//                 {Object.keys(resumeData).length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold mb-2">Resume Data:</h3>
//                     <ul className="list-disc pl-6">
//                       {Object.entries(resumeData).map(([key, value]) => (
//                         <li key={key} className="text-blue-600">
//                           <strong>{key}:</strong> {value}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <div className="flex justify-between mt-6">
//                   <button
//                     onClick={handleStartInterview}
//                     className="px-6 py-3 bg-green-500 text-white rounded-lg"
//                   >
//                     Start Interview
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="px-6 py-3 bg-red-500 text-white rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Right Image */}
//       <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-green-50 to-white">
//         <img
//           src="/path-to-image.jpg"
//           alt="Placeholder"
//           className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
//         />
//       </div>
//     </section>
//   );
// };

// export default Hero;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ResumeScanner from "./ResumeScanner";

interface HeroProps {
  isAuthenticated: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<Record<string, any>>({});

  const extractSkillsFromResume = (file: Blob): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const extractedSkills = content.includes("JavaScript")
          ? ["JavaScript", "React.js", "Node.js", "CSS"]
          : ["Skills not detected"];
        resolve(extractedSkills);
      };
      reader.onerror = () => reject("Failed to read the file");
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      setMessage("Please upload a valid PDF file.");
      return;
    }

    setAnalyzing(true);
    setMessage("");
    try {
      const extractedSkills = await extractSkillsFromResume(file);
      setSkills(extractedSkills);
      setUploaded(true);
    } catch (err) {
      setMessage(String(err));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCancel = () => {
    setUploaded(false);
    setSkills([]);
    setMessage("");
    setResumeData({});
  };

  const handleStartInterview = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    window.open("/interview", "_blank");
  };

  return (
    <section className="flex flex-row min-h-screen w-full">
      {/* Left Content */}
      <div className="text-black w-1/2 flex flex-col justify-center p-12 bg-gradient-to-r from-green-200 to-green-50">
        {!uploaded ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Smarter AI Interviews, Redefining Careers with{" "}
              <span className="text-green-500">KickBegin</span>
            </h2>
            <p className="mb-6 text-gray-600">
              Upload your resume to start analyzing your potential!
            </p>
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="px-6 py-3 font-semibold bg-green-500 text-white rounded-lg"
            >
              Upload Resume
            </button>
            <input
              id="fileInput"
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Resume Analysis</h2>
            {analyzing ? (
              <p className="text-gray-600">Analyzing your resume...</p>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">
                  Extracted Skills:
                </h3>
                <ul className="list-disc pl-6">
                  {skills.map((skill, index) => (
                    <li key={index} className="text-green-500">
                      {skill}
                    </li>
                  ))}
                </ul>
                {/* Resume Scanner Component */}
                <ResumeScanner onExtractedData={setResumeData} />
                {Object.keys(resumeData).length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Resume Data:</h3>
                    <ul className="list-disc pl-6">
                      {Object.entries(resumeData).map(([key, value]) => (
                        <li key={key} className="text-blue-600">
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleStartInterview}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg"
                  >
                    Start Interview
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Image */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-green-50 to-white">
        <img
          src="/character.webp"
          alt="Placeholder"
          className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
