import { redirect } from "next/navigation";

export default function PostulacionIndex() {
  redirect("/postulacion/datospersonales");

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Cargando formulario...
        </h1>
        <p className="text-gray-600">Redirigiendo al primer paso</p>
      </div>
    </div>
  );
}
