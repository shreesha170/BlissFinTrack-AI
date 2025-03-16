// "use client";

// import { useCSVReader } from "react-papaparse";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import { toast } from "sonner";
// import { parse, isValid, format } from "date-fns";
// import { useState } from "react";

// const ImportTransactions = ({ onImport }) => {
//     const [transactions, setTransactions] = useState([]);

//   const { CSVReader } = useCSVReader();

//   // Handle CSV Import
//   const handleImportedData = (results) => {
//     console.log("CSV Upload Triggered:", results);
  
//     if (!results || !results.data || !Array.isArray(results.data)) {
//       console.error("Invalid CSV format:", results);
//       toast.error("Invalid CSV format");
//       return;
//     }
  
//     const parsedData = results.data.map((row) => {
//       let parsedDate = parse(row[0], "yyyy-MM-dd", new Date()); // Adjust format as per your CSV data
  
//       if (!isValid(parsedDate)) {
//         parsedDate = ""; // Set empty string if the date is invalid
//       } else {
//         parsedDate = format(parsedDate, "yyyy-MM-dd"); // Ensure proper formatting
//       }
  
//       return {
//         date: parsedDate,
//         description: row[1] || "",
//         amount: parseFloat(row[2]) || 0,
//         category: row[3] || "",
//         recurring: row[4] === "true",
//       };
//     });
  
//     setTransactions((prev) => [...prev, ...parsedData]);
//     toast.success("CSV Imported Successfully!");
//   };

//   return (
//     <CSVReader onUploadAccepted={handleImportedData}>
//       {({ getRootProps }) => (
//         <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
//           <Upload className="size-4 mr-2" />
//           Import CSV
//         </Button>
//       )}
//     </CSVReader>
//   );
// };

// export default ImportTransactions;


// import { useState } from "react";
// import Papa from "papaparse";

// const ImportCSV = ({ onDataImported }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleImport = () => {
//     if (!file) {
//       alert("Please select a CSV file first.");
//       return;
//     }

//     Papa.parse(file, {
//       header: true, // Treat first row as headers
//       skipEmptyLines: true,
//       complete: (result) => {
//         onDataImported(result.data); // Send parsed data to parent
//       },
//     });
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv" onChange={handleFileChange} />
//       <button onClick={handleImport}>Import CSV</button>
//     </div>
//   );
// };

// export default ImportCSV;
