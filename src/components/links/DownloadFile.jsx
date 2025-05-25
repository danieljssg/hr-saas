import { FileDown } from "lucide-react";

export const DownloadFile = ({ href = "/" }) => {
  console.log(href);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border hover:border-primary hover:bg-primary hover:text-white rounded-sm flex shrink items-center justify-center w-4 h-4 p-4 transition-all duration-300 ease-in-out"
    >
      <FileDown className="shrink-0 p-0.5" />
    </a>
  );
};
