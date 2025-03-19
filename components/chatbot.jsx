// "use client";  
// import { useState, useRef } from "react";  
// import { motion, AnimatePresence } from "framer-motion";  
// import { MessageCircle, X, Send, Loader2 } from "lucide-react";  
// import { Button } from "@/components/ui/button";  

// const Chatbot = () => { 
//   const [isChatOpen, setIsChatOpen] = useState(false); 
//   const [messages, setMessages] = useState([]);  
//   const inputRef = useRef(null);  

//   return (  
//     <div>  
//       {!isChatOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Button
//             className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg"
//             onClick={() => setIsChatOpen(true)}
//           >
//             <MessageCircle className="text-white w-6 h-6" />
//           </Button>
//         </motion.div>
//       )}

//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             initial={{ y: 200, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 200, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 100 }}
//             className="fixed bottom-20 right-6 bg-white w-80 shadow-xl rounded-lg border border-gray-200"
//           >
//             <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 rounded-t-lg">
//               <h3 className="text-lg font-bold">Chat with BlissFinTrack</h3>
//               <X onClick={() => setIsChatOpen(false)} className="cursor-pointer w-5 h-5" />
//             </div>

//             <ScrollArea className="h-60 p-4 overflow-y-auto">
//               {messages.length === 0 ? (
//                 <div className="text-gray-500 text-center">No messages yet</div>
//               ) : (
//                 messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
//                   >
//                     <div
//                       className={`inline-block rounded-lg ${
//                         message.role === "user"
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-muted"
//                       }`}
//                     >
//                       <ReactMarkdown
//                         children={message.content}
//                         remarkPlugins={[remarkGfm]}
//                         components={{
//                           code({ node, inline, className, children, ...props }) {
//                             return inline ? (
//                               <code {...props} className="bg-gray-200 px-1 rounded">
//                                 {children}
//                               </code>
//                             ) : (
//                               <pre {...props} className="bg-gray-200 p-2 rounded">
//                                 <code>{children}</code>
//                               </pre>
//                             );
//                           },
//                           ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
//                           ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
//                           li: ({ children }) => <li className="ml-4">{children}</li>,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))
//               )}
//               {isLoading && (
//                 <div className="w-full flex items-center justify-center gap-3">
//                   <Loader2 className="animate-spin h-5 w-5 text-primary" />
//                   <button type="button" className="underline" onClick={stop}>
//                     Abort
//                   </button>
//                 </div>
//               )}
//               {error && (
//                 <div className="w-full flex items-center justify-center gap-3">
//                   <div>An error occurred: {error.message}</div>
//                   <button type="button" className="underline" onClick={reload}>
//                     Retry
//                   </button>
//                 </div>
//               )}
//               <div ref={scrollRef} />
//             </ScrollArea>

//             <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t">
//               <Input
//                 className="flex-1"
//                 value={input}
//                 onChange={handleInputChange}
//                 placeholder="Type your message..."
//               />
//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//               >
//                 <Send className="text-white" />
//               </Button>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>  
//   );  
// };  

// export default Chatbot;
