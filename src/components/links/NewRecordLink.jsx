import Link from "next/link";
import { BadgePlus } from "lucide-react";

Link;
export const NewRecordLink = ({ href = "/" }) => {
  return (
    <Link
      href={href}
      className="gap-2 bg-primary hover:bg-blue-500 hover:scale-[1.02] items-center justify-center rounded-full flex transition-all duration-300 ease-in-out p-2 text-sm"
    >
      <BadgePlus className="shrink-0 w-5 h-5" />
      Crear Nuevo
    </Link>
  );
};
