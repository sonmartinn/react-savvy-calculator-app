import React, { useState } from "react";
import CalcButton from "./CalcButton";

type CalcOperator = "+" | "-" | "x" | "/" | null;

// Hiển thị nút theo grid mới bo tròn, màu sáng
const arr = [
  { label: "AC", id: "clear", type: "red", row: 1, col: 1, colSpan: 2 },
  { label: "/", id: "divide", row: 1, col: 3 },
  { label: "x", id: "multiply", row: 1, col: 4 },
  { label: "7", id: "seven", row: 2, col: 1 },
  { label: "8", id: "eight", row: 2, col: 2 },
  { label: "9", id: "nine", row: 2, col: 3 },
  { label: "-", id: "subtract", row: 2, col: 4 },
  { label: "4", id: "four", row: 3, col: 1 },
  { label: "5", id: "five", row: 3, col: 2 },
  { label: "6", id: "six", row: 3, col: 3 },
  { label: "+", id: "add", row: 3, col: 4 },
  { label: "1", id: "one", row: 4, col: 1 },
  { label: "2", id: "two", row: 4, col: 2 },
  { label: "3", id: "three", row: 4, col: 3 },
  { label: "=", id: "equals", type: "blue", row: 4, col: 4, rowSpan: 2 },
  { label: "0", id: "zero", row: 5, col: 1, colSpan: 2 },
  { label: ".", id: "decimal", row: 5, col: 3 },
];

function evaluate(expr: string[]): string {
  try {
    let exp = expr.join(" ");
    exp = exp.replace(/x/g, "*").replace(/\//g, "/");
    // eslint-disable-next-line no-eval
    const result = eval(exp);
    if (typeof result === "number" && isFinite(result)) {
      return result.toString();
    }
    return "Error";
  } catch {
    return "Error";
  }
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleButtonClick = (key: string) => {
    if (key === "AC") {
      setDisplay("0");
      setCurrentInput([]);
      setResult(null);
      setHistory("");
      return;
    }
    if (key === "=") {
      if (currentInput.length === 0) return;
      const last = currentInput[currentInput.length - 1];
      if (["+", "-", "x", "/"].includes(last)) return;
      const res = evaluate(currentInput);
      setResult(res);
      setDisplay(res);
      setHistory(currentInput.join(" ") + " = " + res);
      setCurrentInput([]);
      return;
    }
    if (["+", "-", "x", "/"].includes(key)) {
      if (currentInput.length === 0 && result) {
        setCurrentInput([result, key]);
        setDisplay(key);
        setHistory(result + " " + key);
        setResult(null);
        return;
      }
      if (currentInput.length === 0) return;
      const last = currentInput[currentInput.length - 1];

      // Nếu trước đó là dấu và dấu vừa nhập là "-", cho phép tạo số âm
      if (["+", "x", "/"].includes(last) && key === "-") {
        setCurrentInput([...currentInput, key]);
        setHistory(currentInput.join(" ") + " " + key);
      }
      // Nếu trước đó là dấu và dấu vừa nhập cũng là dấu (không phải "-"), thay thế dấu trước đó bằng dấu mới
      else if (["+", "-", "x", "/"].includes(last) && key !== "-") {
        // Nếu trước đó là 2 dấu liên tiếp (ví dụ: *, -), thay cả 2 bằng dấu mới
        if (
          currentInput.length >= 2 &&
          ["+", "-", "x", "/"].includes(currentInput[currentInput.length - 2])
        ) {
          currentInput.splice(currentInput.length - 2, 2, key);
          setCurrentInput([...currentInput]);
          setHistory(currentInput.slice(0, -1).join(" ") + " " + key);
        } else {
          currentInput[currentInput.length - 1] = key;
          setCurrentInput([...currentInput]);
          setHistory(currentInput.slice(0, -1).join(" ") + " " + key);
        }
      }
      // Nếu trước đó không phải là dấu, thêm dấu mới
      else {
        setCurrentInput([...currentInput, key]);
        setHistory(currentInput.join(" ") + " " + key);
      }
      setDisplay(key);
      setResult(null);
      return;
    }
    // Numbers & dot
    if (
      currentInput.length &&
      !["+", "-", "x", "/"].includes(currentInput[currentInput.length - 1])
    ) {
      const last = currentInput[currentInput.length - 1];
      if (
        (key === "0" && last.includes("0") && last.length === 1) ||
        (key === "." && last.includes("."))
      ) {
        return;
      }
      if (/^\d+\.?\d*$/.test(last) && key !== ".") {
        currentInput[currentInput.length - 1] = last + key;
      } else {
        currentInput[currentInput.length - 1] = last + key;
      }
      setCurrentInput([...currentInput]);
      setDisplay(currentInput[currentInput.length - 1]);
      setHistory(
        currentInput.slice(0, -1).join(" ") +
          " " +
          currentInput[currentInput.length - 1] +
          " " +
          (result ? "= " + result : "")
      );
    } else {
      if (
        key === "." &&
        (!currentInput.length ||
          isNaN(Number(currentInput[currentInput.length - 1])))
      ) {
        setCurrentInput([...currentInput, "0."]);
        setDisplay("0.");
        setHistory(
          currentInput.join(" ") + " 0. " + (result ? "= " + result : "")
        );
      } else {
        setCurrentInput([...currentInput, key]);
        setDisplay(key);
        setHistory(
          currentInput.join(" ") +
            " " +
            key +
            " " +
            (result ? "= " + result : "")
        );
      }
    }
    setResult(null);
  };

  // Keyboard support
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        Enter: "=",
        Escape: "AC",
        "*": "x",
      };
      let key = e.key;
      if (map[key]) key = map[key];
      if (
        /^[0-9]$/.test(key) ||
        key === "." ||
        ["+", "-", "/", "x", "=", "AC"].includes(key)
      ) {
        e.preventDefault();
        handleButtonClick(key);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [currentInput, result]);

  return (
    <div
      className="font-mono rounded-3xl shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #f0f5ff 0%, #bdd2f6 100%)",
        border: "none",
        width: 360,
        minHeight: 430,
        margin: "0 auto",
        padding: "0.75rem 0.75rem 1.5rem 0.75rem",
        boxShadow: "0 8px 36px rgba(60,90,170,0.13), 0 1.5px 3px #9bb7da",
      }}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex flex-col items-end p-4 bg-white/90 rounded-2xl mb-2 drop-shadow">
        <div
          className="text-xs text-sky-500 min-h-5 font-mono"
          style={{ letterSpacing: "0.3px" }}
        >
          {history}
        </div>
        <div
          id="display"
          className="text-3xl md:text-4xl text-slate-900 min-h-[36px] font-mono text-right font-bold leading-tight pt-1"
          style={{ letterSpacing: 1.2 }}
        >
          {display.length > 15 ? display.slice(0, 15) : display}
        </div>
      </div>
      {/* Nút */}
      <div className="grid grid-cols-4 grid-rows-5 gap-2">
        {arr.map(({ label, id, type }) => (
          <CalcButton
            id={id}
            key={label}
            typeColor={type as any}
            className={`
              ${label === "AC" ? "col-span-2" : ""}
              ${label === "AC" ? "font-semibold" : ""}
              ${label === "0" ? "col-span-2" : ""}
              ${label === "=" ? "row-span-2" : ""}
              ${label === "=" ? "h-auto" : "h-14 md:h-16"} w-full
              ${label === "=" ? "font-semibold" : ""}
              transition 
              focus:ring-2 focus:ring-sky-300
            `}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </CalcButton>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
