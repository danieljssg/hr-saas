"use client";

import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const opcionesIngreso = [
  { value: "inmediata", label: "Disponibilidad inmediata" },
  { value: "5_dias", label: "En 5 días" },
  { value: "15_dias", label: "En 15 días" },
  { value: "mas_15_dias", label: "Más de 15 días" },
];

export function SelectAvailability({
  control,
  name,
  label,
  rules,
  errors,
  placeholder = "Seleccione",
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
            <SelectContent>
              {opcionesIngreso.map((opcion) => (
                <SelectItem key={opcion.value} value={opcion.value}>
                  {opcion.label}
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
