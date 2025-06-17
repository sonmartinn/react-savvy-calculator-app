import React from "react";

interface CalcButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeColor?: "red" | "blue" | "default";
  children: React.ReactNode;
}
const colorClass = {
  red: "bg-red-400 text-white hover:bg-red-500 shadow-lg",
  blue: "bg-sky-600 text-white hover:bg-sky-700 shadow-lg",
  default: "bg-slate-200 text-gray-900 hover:bg-slate-300 shadow-md",
};
const CalcButton: React.FC<CalcButtonProps> = ({
  typeColor = "default",
  className = "",
  ...props
}) => (
  <button
    className={`
      ${className}
      font-mono text-xl md:text-2xl 
      transition-all select-none focus:outline-none
      rounded-xl
      py-2
      active:scale-95
      ${colorClass[typeColor]}
      border-2 border-transparent
      hover:border-sky-400
    `}
    {...props}
  >
    {props.children}
  </button>
);
export default CalcButton;
