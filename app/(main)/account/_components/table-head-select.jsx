// import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";

// const OPTIONS = ["Date & Time", "Description", "Category", "Amount", "Recurring", "Skip"];

// const TableSelect = ({ columnIndex, selectedColumns, onChange }) => {
//   const currentSelection = selectedColumns[`column_${columnIndex}`] || "Skip";

//   return (
//     <Select
//       value={currentSelection}
//       onValueChange={(value) => onChange(columnIndex, value)}
//     >
//       <SelectTrigger
//         className={cn(
//           "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
//           currentSelection && "text-blue-500"
//         )}
//       >
//         <SelectValue placeholder="Select Column" />
//       </SelectTrigger>
//       <SelectContent>
//         {OPTIONS.map((option, index) => {
//           const disabled =
//             option !== "Skip" && Object.values(selectedColumns).includes(option);
//           return (
//             <SelectItem
//               key={index}
//               value={option}
//               disabled={disabled}
//               className="capitalize"
//             >
//               {option}
//             </SelectItem>
//           );
//         })}
//       </SelectContent>
//     </Select>
//   );
// };

// export default TableSelect;
