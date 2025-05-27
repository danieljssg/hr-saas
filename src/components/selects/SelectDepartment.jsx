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

const departamentos = [
  "Administración",
  "Almacen",
  "Calidad",
  "Compras",
  "Contabilidad",
  "Finanzas",
  "Legal",
  "Logística",
  "Mantenimiento",
  "Mercadeo",
  "Operaciones",
  "Producción",
  "Protección y Control de Riesgos",
  "Recursos Humanos",
  "Salud y Seguridad Laboral",
  "Sistemas",
  "Ventas",
];

export function SelectDepartment({
  control,
  name,
  label,
  rules,
  errors,
  placeholder = "Seleccione el departamento",
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
              {departamentos.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
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
