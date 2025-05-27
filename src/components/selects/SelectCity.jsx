import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Esta lista es un ejemplo. Idealmente, se cargaría dinámicamente o desde un archivo de constantes.
// Considera filtrar ciudades por estado seleccionado en el futuro.
const ciudadesVenezuela = [
  "Caracas",
  "Maracay",
  "Valencia",
  "Barquisimeto",
  "Maracaibo",
  "Puerto La Cruz",
  "Ciudad Guayana",
  "Maturín",
  "Cumaná",
  "Mérida",
  "San Cristóbal",
  "Barinas",
  "Los Teques",
  "Guarenas",
  "Guatire",
  "Charallave",
  "Cagua",
  "Turmero",
  "La Victoria",
  "Puerto Cabello",
  "Cabimas",
  "Ciudad Ojeda",
  // ... más ciudades
];

export function SelectCity({
  control,
  name,
  label,
  rules,
  errors,
  placeholder = "Seleccione su ciudad",
  className,
}) {
  return (
    <div className={`flex flex-col gap-2 ${className || "w-full"}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <SelectTrigger id={name} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {ciudadesVenezuela.map((ciudad) => (
                <SelectItem key={ciudad} value={ciudad}>
                  {ciudad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-amber-400 text-xs">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
