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
import { Phone } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";

export default function ContactSection() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: (() => {
      if (typeof window === "undefined") {
        return { correo: "", telefono: "", direccion: "" };
      }
      const savedData = localStorage.getItem("talentFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          correo: parsedData.correo || "",
          telefono: parsedData.telefono || "",
          direccion: parsedData.direccion || "",
        };
      }
      return { correo: "", telefono: "", direccion: "" };
    })(),
  });

  const onSubmit = (data) => {
    const existingTalentFormData = localStorage.getItem("talentFormData");
    const currentTalentFormData = existingTalentFormData
      ? JSON.parse(existingTalentFormData)
      : {};
    const updatedTalentFormData = { ...currentTalentFormData, ...data };
    localStorage.setItem(
      "talentFormData",
      JSON.stringify(updatedTalentFormData)
    );

    // Marcar paso como completado
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes(2)) {
      completedSteps.push(2);
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }
    router.push("/postulacion/infoprofesional");
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold ">Información de Contacto</h1>
        <p className="">Proporcione sus datos de contacto</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Datos de Contacto
          </CardTitle>
          <CardDescription>
            Información para comunicarnos contigo
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 ">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input
              id="correo"
              type="email"
              {...register("correo", {
                required: "Correo electrónico es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingrese un correo electrónico válido",
                },
              })}
              placeholder="ejemplo@correo.com"
            />
            {errors.correo && (
              <p className="text-red-500 dark:text-amber-400 text-xs">
                {errors.correo.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              {...register("telefono", {
                required: "Teléfono es requerido",
                pattern: {
                  // Ejemplo de pattern para teléfonos de Venezuela (ajustar si es necesario)
                  // value: /^(04(12|14|16|24|26)\d{7}|02\d{2}\d{7})$/,
                  value: /^\+?[\d\s-]{7,15}$/, // Pattern más genérico para números de teléfono
                  message: "Ingrese un número de teléfono válido",
                },
              })}
              placeholder="0414-1234567"
            />
            {errors.telefono && (
              <p className="text-red-500 dark:text-amber-400 text-xs">
                {errors.telefono.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="direccion">Dirección</Label>
            <Controller
              name="direccion"
              control={control}
              rules={{ required: "Dirección es requerida" }}
              render={({ field }) => (
                <Textarea
                  id="direccion"
                  {...field}
                  placeholder="Ingrese su dirección completa de forma breve"
                  className="min-h-32 resize-none max-h-32"
                />
              )}
            />
            {errors.direccion && (
              <p className="text-red-500 dark:text-amber-400 text-xs">
                {errors.direccion.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <StepNavigationSimple
        currentStep={2}
        onNext={handleSubmit(onSubmit)}
        canProceed={isValid}
      />
    </form>
  );
}
