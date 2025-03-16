

// import React from 'react';
// import { SignUp } from "@clerk/nextjs";

// const SignUpPage = () => {
// //   console.log("Rendering SignUp page");
//   return <SignUp />;
// };

// export default SignUpPage;


import React from 'react';
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp routing="hash" />;
};

export default SignUpPage;

