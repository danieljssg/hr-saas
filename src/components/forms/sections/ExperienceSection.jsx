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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";

export default function ExperienceSection() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: (() => {
      if (typeof window === "undefined") {
        return {
          experienciaLaboral: "",
          cargoAnterior: "",
          laboresAnteriores: "",
          sinExperiencia: false,
        };
      }
      const savedData = localStorage.getItem("talentFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          experienciaLaboral: parsedData.experienciaLaboral || "",
          cargoAnterior: parsedData.cargoAnterior || "",
          laboresAnteriores: parsedData.laboresAnteriores || "",
          sinExperiencia: parsedData.sinExperiencia || false,
        };
      }
      return {
        experienciaLaboral: "",
        cargoAnterior: "",
        laboresAnteriores: "",
        sinExperiencia: false,
      };
    })(),
  });

  const sinExperiencia = watch("sinExperiencia");

  const handleSinExperiencia = () => {
    const newSinExperiencia = !sinExperiencia;
    setValue("sinExperiencia", newSinExperiencia, { shouldValidate: true });
    if (newSinExperiencia) {
      setValue("experienciaLaboral", "No Aplica", { shouldValidate: true });
      setValue("cargoAnterior", "Sin Experiencia", { shouldValidate: true });
      setValue("laboresAnteriores", "No cuenta con experiencia profesional", {
        shouldValidate: true,
      });
    } else {
      // Opcional: Limpiar campos o restaurar valores previos si los guardaste
      setValue("experienciaLaboral", "", { shouldValidate: true });
      setValue("cargoAnterior", "", { shouldValidate: true });
      setValue("laboresAnteriores", "", { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    const finalData = { ...data };
    // Si no marcó "sin experiencia" pero dejó el campo vacío, lo marcamos como "Sin Experiencia"
    if (!data.sinExperiencia && data.experienciaLaboral.trim() === "") {
      finalData.experienciaLaboral = "No Aplica"; // O "Sin Experiencia" si prefieres
      finalData.sinExperiencia = true; // Actualizar el estado de sinExperiencia
    }

    const savedData = localStorage.getItem("talentFormData");
    const currentData = savedData ? JSON.parse(savedData) : {};
    const updatedData = { ...currentData, ...finalData };
    localStorage.setItem("talentFormData", JSON.stringify(updatedData));

    // Marcar paso como completado
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes(4)) {
      completedSteps.push(4);
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    // Redirigir a página de revisión
    router.push("/postulacion/revision");
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold ">Experiencia Laboral</h1>
        <p className="text-muted-foreground">
          Información sobre su experiencia laboral anterior. Si no posee
          experiencia, puede indicarlo con el bot&oacute;n.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Experiencia Profesional
          </CardTitle>
          <CardDescription>
            Complete si tiene experiencia laboral previa. En caso contrario,
            haga clic en el bot&oacute;n de abajo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="min-h-[100px]"
              disabled={sinExperiencia}
            />
          </div>
        </CardContent>
      </Card>

      <StepNavigationSimple
        currentStep={4}
        onNext={handleSubmit(onSubmit)}
        canProceed={isValid}
        isLastStep="review"
      />
    </form>
  );
}
