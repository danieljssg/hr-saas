"use client";

import { useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";
import { BirthDatePicker } from "@/components/datepickers/BirthDatePicker";

const estadosVenezuela = [
  "Amazonas",
  "Anzoátegui",
  "Apure",
  "Aragua",
  "Barinas",
  "Bolívar",
  "Carabobo",
  "Cojedes",
  "Delta Amacuro",
  "Distrito Capital",
  "Falcón",
  "Guárico",
  "Lara",
  "Mérida",
  "Miranda",
  "Monagas",
  "Nueva Esparta",
  "Portuguesa",
  "Sucre",
  "Táchira",
  "Trujillo",
  "Vargas",
  "Yaracuy",
  "Zulia",
];

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
          edad: "",
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
          edad: parsedData.edad || "",
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
        edad: "",
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
        <CardContent className="grid grid-cols-3 gap-4 ">
          <div className="flex flex-col gap-2 w-4/12">
            <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
            <Controller
              name="tipoDocumento"
              control={control}
              rules={{ required: "Tipo de documento es requerido" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="V">V - Venezolano</SelectItem>
                    <SelectItem value="E">E - Extranjero</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipoDocumento && (
              <p className="text-red-500 text-xs">
                {errors.tipoDocumento.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="numeroDocumento">Número de Cédula</Label>
            <Input
              id="numeroDocumento"
              {...register("numeroDocumento", {
                required: "Número de cédula es requerido",
              })}
              placeholder="Ingrese su cédula Ej: 12345678"
            />
            {errors.numeroDocumento && (
              <p className="text-red-500 text-xs">
                {errors.numeroDocumento.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="estadoCivil">Estado Civil</Label>
            <Controller
              name="estadoCivil"
              control={control}
              rules={{ required: "Estado civil es requerido" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viudo">Viudo(a)</SelectItem>
                    <SelectItem value="union_libre">Unión Libre</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.estadoCivil && (
              <p className="text-red-500 text-xs">
                {errors.estadoCivil.message}
              </p>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              {...register("nombre", { required: "Nombre es requerido" })}
              placeholder="Ingrese su nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs">{errors.nombre.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              {...register("apellido", { required: "Apellido es requerido" })}
              placeholder="Ingrese su apellido"
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs">{errors.apellido.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-4/12">
            <Label htmlFor="estado">Estado</Label>
            <Controller
              name="estado"
              control={control}
              rules={{ required: "Estado es requerido" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione su estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosVenezuela.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.estado && (
              <p className="text-red-500 text-xs">{errors.estado.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input
              id="ciudad"
              {...register("ciudad", { required: "Ciudad es requerida" })}
              placeholder="Ingrese su ciudad"
            />
            {errors.ciudad && (
              <p className="text-red-500 text-xs">{errors.ciudad.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
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
              <p className="text-red-500 text-xs">
                {errors.fechaNacimiento.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Género</Label>
            <Controller
              name="genero"
              control={control}
              rules={{ required: "Género es requerido" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femenino" id="femenino" />
                    <Label htmlFor="femenino">Femenino</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.genero && (
              <p className="text-red-500 text-xs">{errors.genero.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input
              id="edad"
              type="number"
              min="18"
              max="65"
              {...register("edad", {
                required: "Edad es requerida",
                valueAsNumber: true,
                min: { value: 18, message: "Debe ser mayor o igual a 18" },
                max: { value: 65, message: "Debe ser menor o igual a 65" },
              })}
              placeholder="Edad"
            />
            {errors.edad && (
              <p className="text-red-500 text-xs">{errors.edad.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>¿Posee vehículo propio?</Label>
            <Controller
              name="poseeVehiculo"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vehiculo"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="vehiculo">Sí, poseo vehículo propio</Label>
                </div>
              )}
            />
            {/* No se muestra error para el checkbox usualmente, a menos que sea obligatorio marcarlo */}
          </div>
        </CardContent>
      </Card>

      <StepNavigationSimple
        currentStep={1}
        onNext={handleSubmit(onSubmit)} // El botón "Next" dentro de StepNavigationSimple debería ser type="submit" o llamar a esta función
        canProceed={isValid}
      />
    </form>
  );
}
