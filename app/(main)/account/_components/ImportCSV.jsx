"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import Papa from "papaparse";

const REQUIRED_HEADERS = ["Date & Time", "Description", "Category", "Amount", "Recurring"];

const ImportCSV = ({ onImport }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const { data, meta } = result;

        // Validate headers
        const fileHeaders = meta.fields || [];
        const isValid = REQUIRED_HEADERS.every((header) => fileHeaders.includes(header));

        if (!isValid) {
          setError("Invalid CSV format. Please use the correct headers.");
          return;
        }

        setError(""); // Clear error if the file is valid
        onImport(data); // Pass parsed data to parent component
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

      <Button onClick={() => fileInputRef.current?.click()}>Import CSV</Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImportCSV;
