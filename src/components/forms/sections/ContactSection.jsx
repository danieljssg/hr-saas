"use client";

import { Controller } from "react-hook-form"; // Controller sigue siendo necesario
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
import { Phone } from "lucide-react";

export default function ContactSection({ control, register, errors }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Datos de Contacto
          </CardTitle>
          <CardDescription>Revise su información de contacto.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
          <div className="flex flex-col gap-2 w-full col-span-1 md:col-span-2">
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
    </>
  );
}
