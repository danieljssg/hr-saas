"use client";

import { Controller } from "react-hook-form"; // Controller sigue siendo necesario
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { SelectDepartment } from "@/components/selects/SelectDepartment";
import { SelectAcademicLevel } from "@/components/selects/SelectAcademicLevel";
import { SelectWorkShift } from "@/components/selects/SelectWorkShift";
import { SelectAvailability } from "@/components/selects/SelectAvailability";

export default function ProfesionalSection({
  control,
  register,
  errors,
  watch,
}) {
  const presentacionValue = watch("presentacion", ""); // Usa prop watch

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Datos Académicos y Profesionales
        </CardTitle>
        <CardDescription>
          Revise su información sobre formación y aspiraciones laborales.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <SelectDepartment
          control={control}
          name="departamento"
          label="Departamento de Interés"
          rules={{ required: "Departamento es requerido" }}
          errors={errors}
        />
        <SelectAcademicLevel
          control={control}
          name="nivelEducativo"
          label="Nivel Educativo"
          rules={{ required: "Nivel educativo es requerido" }}
          errors={errors}
        />

        <SelectWorkShift
          control={control}
          name="disponibilidadHorario"
          label="Disponibilidad de Horario"
          rules={{ required: "Disponibilidad de horario es requerida" }}
          errors={errors}
        />
        <SelectAvailability
          control={control}
          name="disponibilidadIngreso"
          label="Disponibilidad (Días Hábiles)"
          rules={{ required: "Disponibilidad para ingreso es requerida" }}
          errors={errors}
        />

        <div className="flex flex-col gap-2 w-full col-span-1 md:col-span-2">
          <Label htmlFor="presentacion">Breve Presentación Personal</Label>
          <span className="text-xs text-muted-foreground">
            <b>¿Listo para inspirarnos?</b> Este es tu espacio para presentarte:
            ¿quién eres, qué haces y cuáles son tus fortalezas únicas? Queremos
            entender cómo tu talento y tu energía pueden integrarse y potenciar
            nuestro equipo para alcanzar grandes metas.
          </span>
          <Controller
            name="presentacion"
            control={control}
            rules={{
              required: "Presentación personal es requerida",
              minLength: {
                value: 50,
                message: "La presentación debe tener al menos 50 caracteres",
              },
              maxLength: {
                value: 1000,
                message: "La presentación no debe exceder los 1000 caracteres",
              },
            }}
            render={({ field }) => (
              <Textarea
                id="presentacion"
                {...field}
                placeholder="Presentación personal"
                className="min-h-60 resize-none max-h-60 w-full overflow-auto"
              />
            )}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              Enfócate en lo esencial. Sé breve, pero deja una huella clara.
            </span>
            <span>{presentacionValue.length}/1000</span>
          </div>
          {errors.presentacion && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              {errors.presentacion.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
