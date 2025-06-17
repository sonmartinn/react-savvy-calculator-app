// Giao diện trang calculator theo mẫu
import Calculator from "../components/Calculator";
import { FaGithub } from "react-icons/fa";

const Index = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ background: "#C3C3D1" }}
    >
      <Calculator />
      <footer className="mt-8 text-center">
        <div className="font-mono text-sm text-gray-900 tracking-wide">
          Designed and Coded By
        </div>
        <a
          className="font-mono text-md text-blue-900 w-full flex items-center justify-center gap-2 mt-1 hover:text-blue-700 transition-colors"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/sonmartinn"
        >
          Son Martin <FaGithub />
        </a>
      </footer>
    </div>
  );
};

export default Index;
