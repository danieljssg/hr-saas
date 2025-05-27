"use client";

import { Controller } from "react-hook-form"; // Controller sigue siendo necesario
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { BirthDatePicker } from "@/components/datepickers/BirthDatePicker";
import { SelectDocType } from "@/components/selects/SelectDocType";
import { SelectMaritalStatus } from "@/components/selects/SelectMaritalStatus";
import { SelectState } from "@/components/selects/SelectState";
import { RadioGroupGender } from "@/components/radios/RadioGroupGender";
import { CheckboxVehicle } from "@/components/checkboxes/CheckboxVehicle";

export default function PersonalSection({ control, register, errors }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Información Personal
        </CardTitle>
        <CardDescription>
          Revise su información personal básica.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <SelectDocType
          name="tipoDocumento"
          label="Tipo de Documento"
          control={control}
          rules={{ required: "Tipo de documento es requerido" }}
          errors={errors}
        />
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="numeroDocumento">Número de Cédula</Label>
          <Input
            id="numeroDocumento"
            type="text"
            {...register("numeroDocumento", {
              required: "Número de cédula es requerido",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 dígitos",
              },
              maxLength: {
                value: 8,
                message: "Verifique si la cédula es correcta",
              },
              pattern: {
                value: /^\d+$/,
                message: "Solo se permiten números",
              },
            })}
            placeholder="Ingrese su cédula Ej: 12345678"
          />
          {errors.numeroDocumento && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              *{errors.numeroDocumento.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            {...register("nombre", {
              required: "Nombre es requerido",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Nombre solo puede contener letras y espacios",
              },
            })}
            placeholder="Ingrese su nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            {...register("apellido", {
              required: "Apellido es requerido",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Apellido solo puede contener letras y espacios",
              },
            })}
            placeholder="Ingrese su apellido"
          />
          {errors.apellido && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              {errors.apellido.message}
            </p>
          )}
        </div>

        <SelectMaritalStatus
          name="estadoCivil"
          label="Estado Civil"
          control={control}
          rules={{ required: "Estado civil es requerido" }}
          errors={errors}
        />
        <div className="flex flex-col gap-2 w-full">
          <Label>Fecha de Nacimiento</Label>
          <Controller
            name="fechaNacimiento"
            control={control}
            rules={{ required: "Fecha de nacimiento es requerida" }}
            render={({ field }) => (
              <BirthDatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="Seleccionar fecha"
              />
            )}
          />
          {errors.fechaNacimiento && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              {errors.fechaNacimiento.message}
            </p>
          )}
        </div>
        <SelectState
          name="estado"
          label="Estado"
          control={control}
          rules={{ required: "Estado es requerido" }}
          errors={errors}
        />

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            {...register("ciudad", {
              required: "Ciudad es requerida",
              pattern: {
                value: /^[a-zA-Z\s.,'-]*$/, // Ejemplo: letras, espacios, y algunos caracteres comunes en nombres de ciudades
                message: "Ciudad contiene caracteres no válidos",
              },
            })}
            placeholder="Ingrese su ciudad"
          />
          {errors.ciudad && (
            <p className="text-red-500 dark:text-amber-400 text-xs">
              {errors.ciudad.message}
            </p>
          )}
        </div>

        <RadioGroupGender
          name="genero"
          label="Género"
          control={control}
          rules={{ required: "Género es requerido" }}
          errors={errors}
        />

        <CheckboxVehicle
          name="poseeVehiculo"
          label="¿Posee vehículo propio?"
          checkboxLabel="Sí, poseo vehículo propio"
          control={control}
          // rules={{ required: "Este campo es obligatorio" }} // Descomentar si el checkbox es obligatorio
          errors={errors}
        />
      </CardContent>
      {/* Card de cierre eliminada */}
    </Card>
  );
}
