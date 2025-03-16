// import { Upload } from "lucide-react";
// import { useCSVReader } from "react-papaparse";
// import { Button } from "@/components/ui/button";

// const UploadButton = ({ onUpload }) => {
//     const { CSVReader } = useCSVReader();

//     return (
//         <CSVReader
//             onUploadAccepted={(results) => {
//                 console.log("File Uploaded:", results); // Debugging log
//                 onUpload(results);
//             }}
//         >
//             {({ getRootProps }) => (
//                 <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
//                     <Upload className="size-4 mr-2" />
//                     Import
//                 </Button>
//             )}
//         </CSVReader>
//     );
// };

// export default UploadButton;
