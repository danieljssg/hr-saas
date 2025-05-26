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
import { User } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";
import { BirthDatePicker } from "@/components/datepickers/BirthDatePicker";
import { SelectDocType } from "@/components/selects/SelectDocType";
import { SelectMaritalStatus } from "@/components/selects/SelectMaritalStatus";
import { SelectState } from "@/components/selects/SelectState";
import { RadioGroupGender } from "@/components/radios/RadioGroupGender";
import { CheckboxVehicle } from "@/components/checkboxes/CheckboxVehicle";

export default function PersonalSection() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Validate on change for immediate feedback on `isValid`
    defaultValues: (() => {
      if (typeof window === "undefined") {
        return {
          tipoDocumento: "",
          numeroDocumento: "",
          nombre: "",
          apellido: "",
          estado: "",
          ciudad: "",
          genero: "",
          fechaNacimiento: null,
          estadoCivil: "",
          poseeVehiculo: false,
        };
      }
      const savedData = localStorage.getItem("talentFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          tipoDocumento: parsedData.tipoDocumento || "",
          numeroDocumento: parsedData.numeroDocumento || "",
          nombre: parsedData.nombre || "",
          apellido: parsedData.apellido || "",
          estado: parsedData.estado || "",
          ciudad: parsedData.ciudad || "",
          genero: parsedData.genero || "",
          fechaNacimiento: parsedData.fechaNacimiento
            ? new Date(parsedData.fechaNacimiento)
            : null,
          estadoCivil: parsedData.estadoCivil || "",
          poseeVehiculo: parsedData.poseeVehiculo || false,
        };
      }
      return {
        tipoDocumento: "",
        numeroDocumento: "",
        nombre: "",
        apellido: "",
        estado: "",
        ciudad: "",
        genero: "",
        fechaNacimiento: null,
        estadoCivil: "",
        poseeVehiculo: false,
      };
    })(),
  });

  // Efecto para resetear el formulario si los datos de localStorage cambian externamente (opcional)
  // O si se necesita cargar datos asíncronamente después del montaje inicial.
  // Por ahora, defaultValues maneja la carga inicial síncrona.

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
    if (!completedSteps.includes(1)) {
      completedSteps.push(1);
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }
    router.push("/postulacion/contacto");
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold ">Datos Personales</h1>
        <p className="text-muted-foreground">
          Complete su información personal básica
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Todos los campos son obligatorios</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 ">
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
      </Card>

      <StepNavigationSimple
        currentStep={1}
        onNext={handleSubmit(onSubmit)}
        canProceed={isValid}
      />
    </form>
  );
}
