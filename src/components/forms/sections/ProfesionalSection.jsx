"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import StepNavigationSimple from "@/components/layout/StepNavigation";
import { SelectDepartment } from "@/components/selects/SelectDepartment";
import { SelectAcademicLevel } from "@/components/selects/SelectAcademicLevel";
import { SelectWorkShift } from "@/components/selects/SelectWorkShift";
import { SelectAvailability } from "@/components/selects/SelectAvailability";

export default function ProfesionalSection() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: (() => {
      if (typeof window === "undefined") {
        return {
          departamento: "",
          presentacion: "",
          nivelEducativo: "",
          disponibilidadHorario: "",
          disponibilidadIngreso: "", // Nuevo campo
        };
      }
      const savedData = localStorage.getItem("talentFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          departamento: parsedData.departamento || "",
          presentacion: parsedData.presentacion || "",
          nivelEducativo: parsedData.nivelEducativo || "",
          disponibilidadHorario: parsedData.disponibilidadHorario || "",
          disponibilidadIngreso: parsedData.disponibilidadIngreso || "",
        };
      }
      return {
        departamento: "",
        presentacion: "",
        nivelEducativo: "",
        disponibilidadHorario: "",
        disponibilidadIngreso: "",
      };
    })(),
  });

  const presentacionValue = watch("presentacion", "");

  const onSubmit = (data) => {
    const existingTalentFormData = localStorage.getItem("talentFormData");
    const currentTalentFormData = existingTalentFormData
      ? JSON.parse(existingTalentFormData)
      : {};
    // Asegurarse de eliminar el campo expectativaSalarial si existía en localStorage
    delete currentTalentFormData.expectativaSalarial;
    const updatedTalentFormData = { ...currentTalentFormData, ...data };
    localStorage.setItem(
      "talentFormData",
      JSON.stringify(updatedTalentFormData)
    );

    // Marcar paso como completado
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes(3)) {
      completedSteps.push(3);
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }
    router.push("/postulacion/experiencia");
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold ">Información Profesional</h1>
        <p className="">Cuéntanos sobre tu formación y aspiraciones</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Datos Académicos y Profesionales
          </CardTitle>
          <CardDescription>
            Información sobre su formación y aspiraciones laborales
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 ">
          <div className="flex flex-col gap-2 w-full">
            <SelectDepartment
              control={control}
              name="departamento"
              label="Departamento de Interés"
              rules={{ required: "Departamento es requerido" }}
              errors={errors}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <SelectAcademicLevel
              control={control}
              name="nivelEducativo"
              label="Nivel Educativo"
              rules={{ required: "Nivel educativo es requerido" }}
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <SelectWorkShift
              control={control}
              name="disponibilidadHorario"
              label="Disponibilidad de Horario"
              rules={{ required: "Disponibilidad de horario es requerida" }}
              errors={errors}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <SelectAvailability
              control={control}
              name="disponibilidadIngreso"
              label="Disponibilidad (Días Hábiles)"
              rules={{ required: "Disponibilidad para ingreso es requerida" }}
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-2 w-full col-span-2">
            <Label htmlFor="presentacion">Breve Presentación Personal</Label>
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
                  message:
                    "La presentación no debe exceder los 1000 caracteres",
                },
              }}
              render={({ field }) => (
                <Textarea
                  id="presentacion"
                  {...field}
                  placeholder="¿Listo para inspirarnos? Este es tu espacio para presentarte: ¿quién eres, qué haces y cuáles son tus fortalezas únicas? Queremos entender cómo tu talento y tu energía pueden integrarse y potenciar nuestro equipo para alcanzar grandes metas."
                  className="min-h-60 resize-none max-h-60"
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

      <StepNavigationSimple
        currentStep={3}
        onNext={handleSubmit(onSubmit)}
        canProceed={isValid}
      />
    </form>
  );
}
