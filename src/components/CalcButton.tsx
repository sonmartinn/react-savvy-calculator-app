import React, { useEffect, useRef, useState } from "react";

interface CalcButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeColor?: "red" | "blue" | "default";
  children: React.ReactNode;
  keyValue?: string; // Thêm prop để xác định phím tương ứng
}
const colorClass = {
  red: "bg-red-400 text-white hover:bg-red-500 shadow-lg",
  blue: "bg-sky-600 text-white hover:bg-sky-700 shadow-lg",
  default: "bg-slate-200 text-gray-900 hover:bg-slate-300 shadow-md",
};
const CalcButton: React.FC<CalcButtonProps> = ({
  typeColor = "default",
  className = "",
  keyValue,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!keyValue) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Key pressed:", e);
      if (
        e.key.toLowerCase() === keyValue.toLowerCase() ||
        (e.key.toLowerCase() === "escape" && keyValue.toLowerCase() === "ac") ||
        (e.key.toLowerCase() === "enter" && keyValue.toLowerCase() === "=")
      ) {
        setIsActive(true);
        // Optional: focus button for accessibility
        btnRef.current?.focus();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === keyValue.toLowerCase() ||
        (e.key.toLowerCase() === "escape" && keyValue.toLowerCase() === "ac") ||
        (e.key.toLowerCase() === "enter" && keyValue.toLowerCase() === "=")
      ) {
        setIsActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyValue]);

  return (
    <button
      ref={btnRef}
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
        ${isActive ? "scale-95 ring-2 ring-sky-400" : ""}
      `}
      {...props}
    >
      {props.children}
    </button>
  );
};
export default CalcButton;
