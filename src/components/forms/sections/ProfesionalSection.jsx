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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";

const departamentos = [
  "Recursos Humanos",
  "Tecnología",
  "Ventas",
  "Marketing",
  "Finanzas",
  "Operaciones",
  "Atención al Cliente",
  "Logística",
  "Administración",
  "Producción",
  "Calidad",
  "Compras",
  "Legal",
  "Contabilidad",
];

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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departamento">Departamento de Interés *</Label>
              <Controller
                name="departamento"
                control={control}
                rules={{ required: "Departamento es requerido" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="departamento">
                      <SelectValue placeholder="Seleccione el departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.departamento && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.departamento.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nivelEducativo">Nivel Educativo *</Label>
              <Controller
                name="nivelEducativo"
                control={control}
                rules={{ required: "Nivel educativo es requerido" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="nivelEducativo">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachiller">Bachiller</SelectItem>
                      <SelectItem value="tecnico">Técnico Superior</SelectItem>
                      <SelectItem value="universitario">
                        Universitario
                      </SelectItem>
                      <SelectItem value="postgrado">Postgrado</SelectItem>
                      <SelectItem value="maestria">Maestría</SelectItem>
                      <SelectItem value="doctorado">Doctorado</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.nivelEducativo && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.nivelEducativo.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disponibilidadHorario">
                Disponibilidad de Horario *
              </Label>
              <Controller
                name="disponibilidadHorario"
                control={control}
                rules={{ required: "Disponibilidad de horario es requerida" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="disponibilidadHorario">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo_completo">
                        Tiempo Completo
                      </SelectItem>
                      <SelectItem value="rotativo">Rotativo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.disponibilidadHorario && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.disponibilidadHorario.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="disponibilidadIngreso">
                Disponibilidad para Ingreso *
              </Label>
              <Controller
                name="disponibilidadIngreso"
                control={control}
                rules={{ required: "Disponibilidad para ingreso es requerida" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="disponibilidadIngreso">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inmediata">
                        Disponibilidad inmediata
                      </SelectItem>
                      <SelectItem value="5_dias">En 5 días</SelectItem>
                      <SelectItem value="15_dias">En 15 días</SelectItem>
                      <SelectItem value="mas_15_dias">
                        Más de 15 días
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <span className="text-xs text-muted-foreground">
                (Días hábiles)
              </span>
              {errors.disponibilidadIngreso && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.disponibilidadIngreso.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="presentacion">Breve Presentación Personal *</Label>
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
                  value: 500,
                  message: "La presentación no debe exceder los 500 caracteres",
                },
              }}
              render={({ field }) => (
                <Textarea
                  id="presentacion"
                  {...field}
                  placeholder="Describa brevemente quién es usted, sus fortalezas y qué puede aportar a la empresa. Sea específico y conciso."
                  className="min-h-60 resize-none"
                />
              )}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Mínimo 50 caracteres. Sea lo más breve, detallado y específico
                posible.
              </span>
              <span>{presentacionValue.length}/500</span>
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
