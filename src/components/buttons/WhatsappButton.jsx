import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export const WhatsappButton = ({ candidate }) => {
  const waLink = `https://wa.me/${
    candidate.phone
  }?text=%C2%A1Hola%2C%20${candidate.candidate_name
    .split(" ")
    .join(
      "%20"
    )}!%20%C2%A1Es%20un%20gusto%20saludarte%20de%20parte%20del%20equipo%20de%20TUBRICA!%20%20Vimos%20tu%20CV%20y%20tu%20perfil%20nos%20result%C3%B3%20muy%20interesante!.%20%C2%BFTe%20gustar%C3%ADa%20conocer%20los%20siguientes%20pasos%20para%20participar%20en%20nuestro%20proceso%20de%20selecci%C3%B3n%20para%20${
    candidate.position
  }.`;

  return (
    <Link
      href={waLink}
      target="_blank"
      className="text-emerald-500 hover:text-white bg-white hover:bg-emerald-500 rounded-sm flex shrink items-center justify-center w-4 h-4 p-4 transition-all duration-500 ease-in-out"
    >
      <IoLogoWhatsapp size={18} className="shrink-0" />
    </Link>
  );
};
