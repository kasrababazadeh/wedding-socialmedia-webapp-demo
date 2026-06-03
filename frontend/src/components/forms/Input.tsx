// import React from "react";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   id?: string;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ label = "Floating label", id = "floating_input", ...props }, ref) => {
//     return (
//       <div className="relative">
//         <input
//           id={id}
//           ref={ref}
//           placeholder=" "
//           className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           {...props}
//         />
//         {label && (
//           <label
//             htmlFor={id}
//             className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
//               peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
//               peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
//               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
//               peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//           >
//             {label}
//           </label>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

// export default Input;

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;  // className for the wrapper div
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...props }, ref) => {
    return (
      <div className={`relative ${className || ""}`}>
        <input
          id={id}
          ref={ref}
          placeholder=" "
          className="peer block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-md text-gray-900 bg-transparent dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-top-right start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);


Input.displayName = "Input";

export default Input;
