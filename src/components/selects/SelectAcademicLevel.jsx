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

const nivelesEducativos = [
  { value: "bachiller", label: "Bachiller" },
  { value: "tecnico", label: "Técnico Medio" },
  { value: "tsu", label: "Técnico Superior Universitario" },
  { value: "universitario", label: "Universitario" },
  { value: "postgrado", label: "Postgrado" },
  { value: "maestria", label: "Maestría" },
  { value: "doctorado", label: "Doctorado" },
];

export function SelectAcademicLevel({
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
            <SelectContent className="max-h-60">
              {nivelesEducativos.map((nivel) => (
                <SelectItem key={nivel.value} value={nivel.value}>
                  {nivel.label}
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
