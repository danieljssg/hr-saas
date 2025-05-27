"use client";

import { Controller } from "react-hook-form"; // Controller puede ser necesario si se usa directamente
// import { useForm } from "react-hook-form"; // Ya no se usa aquí
// import { useRouter } from "next/navigation"; // Ya no se usa aquí
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function ExperienceSection({
  control,
  register,
  errors,
  watch,
  setValue,
}) {
  const sinExperiencia = watch("sinExperiencia"); // Usa prop watch

  const handleSinExperiencia = () => {
    const newSinExperiencia = !sinExperiencia;
    setValue("sinExperiencia", newSinExperiencia, { shouldValidate: true }); // Usa prop setValue
    if (newSinExperiencia) {
      setValue("experienciaLaboral", "No Aplica", { shouldValidate: true });
      setValue("cargoAnterior", "Sin Experiencia", { shouldValidate: true });
      setValue("laboresAnteriores", "No cuenta con experiencia profesional", {
        shouldValidate: true,
      });
    } else {
      setValue("experienciaLaboral", "", { shouldValidate: true });
      setValue("cargoAnterior", "", { shouldValidate: true });
      setValue("laboresAnteriores", "", { shouldValidate: true });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Experiencia Profesional
          </CardTitle>
          <CardDescription>
            Revise su información sobre experiencia laboral previa.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 col-span-1 md:col-span-2">
            <Button
              type="button"
              variant={sinExperiencia ? "default" : "outline"}
              onClick={handleSinExperiencia}
              className="w-full md:w-auto"
            >
              No tengo Experiencia Laboral
            </Button>
            {sinExperiencia && (
              <span className="text-green-600 text-sm flex items-center gap-1">
                ✓ Se registrará como "Sin Experiencia"
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="experienciaLaboral">
              Empresa de Última Experiencia
            </Label>
            <Input
              id="experienciaLaboral"
              {...register("experienciaLaboral", {
                required: sinExperiencia
                  ? false
                  : "Empresa es requerida si tiene experiencia",
              })}
              placeholder="Nombre de la empresa"
              disabled={sinExperiencia}
            />
            {errors.experienciaLaboral && (
              <p className="text-red-500 dark:text-amber-400 text-xs">
                {errors.experienciaLaboral.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="cargoAnterior">Cargo Desempeñado</Label>
            <Input
              id="cargoAnterior"
              {...register("cargoAnterior")}
              placeholder="Título del cargo que desempeñó"
              disabled={sinExperiencia}
            />
          </div>

          <div className="flex flex-col gap-2 w-full col-span-1 md:col-span-2">
            <Label htmlFor="laboresAnteriores">Descripción de Labores</Label>
            <Textarea
              id="laboresAnteriores"
              {...register("laboresAnteriores")}
              placeholder="Describa las principales funciones y responsabilidades que tenía en su cargo anterior"
              className="min-h-32 resize-none max-h-32"
              disabled={sinExperiencia}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
