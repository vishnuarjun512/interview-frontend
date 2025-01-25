import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";

// Set the worker source for pdf.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Define the props type for the ResumeScanner component
interface ResumeScannerProps {
  onExtractedData: (data: ExtractedData) => void;
}

// Define the structure of the extracted data
interface ExtractedData {
  Name: string;
  Email: string;
  Phone: string;
  Skills: string[];
}

const ResumeScanner: React.FC<ResumeScannerProps> = ({ onExtractedData }) => {
  const [data, setData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string>("");

  const skillsList: string[] = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "Agile",
    "Scrum",
  ];

  const extractSkills = (text: string): string[] => {
    return skillsList.filter((skill) =>
      new RegExp(`\\b${skill}\\b`, "i").test(text)
    );
  };

  const scanResume = async (file: File): Promise<ExtractedData> => {
    try {
      const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
      const pdf = await loadingTask.promise;
      let textContent = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContentPage = await page.getTextContent();
        const pageText = textContentPage.items
          .map((item: any) => (item as any).str)
          .join(" ");
        textContent += pageText + " ";
      }

      // Simulate extracting information like name, email, phone number
      const dummyData: ExtractedData = {
        Name: "John Doe",
        Email: "johndoe@example.com",
        Phone: "123-456-7890",
        Skills: extractSkills(textContent),
      };

      // Simulate rejection
      if (textContent.includes("image")) {
        throw new Error("Resume should not contain images.");
      }

      return dummyData;
    } catch (error: any) {
      throw new Error("Error scanning the resume: " + error.message);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    try {
      const extractedData = await scanResume(file);
      setData(extractedData);
      onExtractedData(extractedData); // Pass data to parent
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Resume Scanner</h3>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h4 className="font-medium">Extracted Data:</h4>
          <ul className="list-disc ml-4 mt-2">
            {Object.entries(data).map(([key, value]) => (
              <li key={key} className="text-gray-700">
                <strong>{key}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeScanner;
