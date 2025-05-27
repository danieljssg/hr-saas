"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  User,
  Phone,
  Briefcase,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

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

export default function ConfirmSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit: handleFormSubmit, // Renombrado para evitar colisión con la función existente
    control,
    watch,
    setValue,
    formState: { errors, isValid },
    reset, // Para resetear el formulario después del envío
  } = useForm({
    mode: "onChange",
    defaultValues: {}, // Se llenará en useEffect
  });

  const sinExperiencia = watch("sinExperiencia");
  const curriculumFile = watch("curriculum");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("talentFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const defaultValuesFromStorage = {
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
          correo: parsedData.correo || "",
          telefono: parsedData.telefono || "",
          direccion: parsedData.direccion || "",
          departamento: parsedData.departamento || "",
          presentacion: parsedData.presentacion || "",
          nivelEducativo: parsedData.nivelEducativo || "",
          disponibilidadHorario: parsedData.disponibilidadHorario || "",
          disponibilidadIngreso: parsedData.disponibilidadIngreso || "", // Asegúrate que este campo se guarde en pasos anteriores
          // No incluimos expectativaSalarial aquí si se eliminó
          experienciaLaboral: parsedData.experienciaLaboral || "",
          cargoAnterior: parsedData.cargoAnterior || "",
          laboresAnteriores: parsedData.laboresAnteriores || "",
          sinExperiencia: parsedData.sinExperiencia || false,
          curriculum: null, // Inicialmente nulo para el input file
        };
        reset(defaultValuesFromStorage); // Usar reset para poblar el formulario
      }
    }
  }, []);

  useEffect(() => {
    if (curriculumFile && curriculumFile.length > 0) {
      setFileName(curriculumFile[0].name);
    } else {
      setFileName("");
    }
  }, [curriculumFile]);

  const handleSinExperiencia = () => {
    const newSinExperiencia = !sinExperiencia;
    setValue("sinExperiencia", newSinExperiencia, { shouldValidate: true });
    if (newSinExperiencia) {
      setValue("experienciaLaboral", "No Aplica", { shouldValidate: true });
      setValue("cargoAnterior", "Sin Experiencia", { shouldValidate: true });
      setValue(
        "laboresAnteriores",
        "No cuenta con experiencia profesional",
        { shouldValidate: true }
      );
    } else {
      setValue("experienciaLaboral", "", { shouldValidate: true });
      setValue("cargoAnterior", "", { shouldValidate: true });
      setValue("laboresAnteriores", "", { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    const formDataToSubmit = new FormData();

    // Ajustar experiencia laboral si es necesario
    if (!data.sinExperiencia && data.experienciaLaboral && data.experienciaLaboral.trim() === "") {
      data.experienciaLaboral = "No Aplica";
      data.sinExperiencia = true;
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "curriculum" && data.curriculum && data.curriculum.length > 0) {
          formDataToSubmit.append(key, data.curriculum[0]);
        } else if (data[key] !== null && data[key] !== undefined && !(data[key] instanceof FileList)) {
          formDataToSubmit.append(key, data[key]);
        }
      }
    }

    console.log("FormData a enviar:");
    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }

    toast.success("Postulación enviada con éxito (simulación). Revisa la consola para ver los datos.");

    // Actualizar localStorage con los datos finales (opcional, ya que se va a limpiar)
    localStorage.setItem("talentFormData", JSON.stringify(data));

    setShowSuccess(true);

    setTimeout(() => {
      localStorage.removeItem("talentFormData");
      localStorage.removeItem("completedSteps");
      // Opcional: resetear el formulario a sus valores iniciales vacíos
      // reset({ ...valores iniciales vacíos... });
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold ">
              ¡Postulación Enviada Exitosamente!
            </h1>
            <p className="">
              Gracias por postularte a nuestra empresa. Hemos recibido tu
              información y nos pondremos en contacto contigo pronto.
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => (window.location.href = "/postulacion")}
                className="w-full"
              >
                Nueva Postulación
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="w-full"
              >
                Volver al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold ">Revisión de Datos</h1>
        <p className="">
          Verifique y edite su información antes de enviar la postulación
        </p>
      </div>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-8">
        {/* Sección: Datos Personales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Datos Personales
            </CardTitle>
            <CardDescription>Información personal básica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  rules={{ required: "Tipo de documento es requerido" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="tipoDocumento"
                    >
                      <SelectTrigger id="tipoDocumento">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="V">V - Venezolano</SelectItem>
                        <SelectItem value="E">E - Extranjero</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipoDocumento && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.tipoDocumento.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="numeroDocumento">Número de Cédula/DNI *</Label>
                <Input
                  id="numeroDocumento"
                  name="numeroDocumento"
                  {...register("numeroDocumento", {
                    required: "Número de documento es requerido",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo números permitidos",
                    },
                  })}
                  placeholder="Ingrese su número de documento"
                />
                {errors.numeroDocumento && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.numeroDocumento.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  {...register("nombre", { required: "Nombre es requerido" })}
                  placeholder="Ingrese su nombre"
                />
                {errors.nombre && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  {...register("apellido", {
                    required: "Apellido es requerido",
                  })}
                  placeholder="Ingrese su apellido"
                />
                {errors.apellido && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Controller
                  name="estado"
                  control={control}
                  rules={{ required: "Estado es requerido" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="estado"
                    >
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Seleccione su estado" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
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
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.estado.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  {...register("ciudad", { required: "Ciudad es requerida" })}
                  placeholder="Ingrese su ciudad"
                />
                {errors.ciudad && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.ciudad.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Género *</Label>
                <Controller
                  name="genero"
                  control={control}
                  rules={{ required: "Género es requerido" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row space-x-4"
                      name="genero"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="masculino"
                          id="masculino-confirm"
                          checked={field.value === "masculino"}
                        />
                        <Label htmlFor="masculino-confirm">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="femenino"
                          id="femenino-confirm"
                          checked={field.value === "femenino"}
                        />
                        <Label htmlFor="femenino-confirm">Femenino</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.genero && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.genero.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edad">Edad *</Label>
                <Input
                  id="edad"
                  name="edad"
                  type="number"
                  min="18"
                  max="65"
                  {...register("edad", {
                    required: "Edad es requerida",
                    min: { value: 18, message: "Debe ser mayor de edad" },
                    max: { value: 65, message: "Edad máxima 65 años" },
                  })}
                  placeholder="Edad"
                />
                {errors.edad && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.edad.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Fecha de Nacimiento *</Label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  rules={{ required: "Fecha de nacimiento es requerida" }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          name="fechaNacimientoTrigger" // Nombre para el trigger
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "dd/MM/yyyy", { // Asegurar que field.value es Date
                                locale: es,
                              })
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : null} // Asegurar que field.value es Date
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estadoCivil">Estado Civil *</Label>
                <Controller
                  name="estadoCivil"
                  control={control}
                  rules={{ required: "Estado civil es requerido" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="estadoCivil"
                    >
                      <SelectTrigger id="estadoCivil">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="soltero">Soltero(a)</SelectItem>
                        <SelectItem value="casado">Casado(a)</SelectItem>
                        <SelectItem value="divorciado">
                          Divorciado(a)
                        </SelectItem>
                        <SelectItem value="viudo">Viudo(a)</SelectItem>
                        <SelectItem value="union_libre">Unión Libre</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.estadoCivil && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.estadoCivil.message}
                  </p>
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
                        id="vehiculo-confirm"
                        name="poseeVehiculo"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="vehiculo-confirm">
                        Sí, poseo vehículo propio
                      </Label>
                    </div>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Información de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Información de Contacto
            </CardTitle>
            <CardDescription>Datos para comunicarnos contigo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico *</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  {...register("correo", {
                    required: "Correo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                      message: "Correo inválido",
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
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  {...register("telefono", {
                    required: "Teléfono es requerido",
                  })}
                  placeholder="0414-1234567"
                />
                {errors.telefono && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.telefono.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección *</Label>
              <Textarea
                id="direccion"
                name="direccion"
                {...register("direccion", {
                  required: "Dirección es requerida",
                })}
                placeholder="Ingrese su dirección completa de forma breve"
                className="min-h-[80px]"
              />
              {errors.direccion && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.direccion.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sección: Información Profesional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Información Profesional
            </CardTitle>
            <CardDescription>
              Datos sobre su formación y aspiraciones laborales
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="departamento"
                    >
                      <SelectTrigger id="departamento">
                        <SelectValue placeholder="Seleccione el departamento" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="nivelEducativo"
                    >
                      <SelectTrigger id="nivelEducativo">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="bachiller">Bachiller</SelectItem>
                        <SelectItem value="tecnico">
                          Técnico Superior
                        </SelectItem>
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
                  rules={{
                    required: "Disponibilidad de horario es requerida",
                  }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="disponibilidadHorario"
                    >
                      <SelectTrigger id="disponibilidadHorario">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="tiempo_completo">
                          Tiempo Completo
                        </SelectItem>
                        <SelectItem value="medio_tiempo">Medio Tiempo</SelectItem>
                        <SelectItem value="por_horas">Por Horas</SelectItem>
                        <SelectItem value="fines_semana">
                          Fines de Semana
                        </SelectItem>
                        <SelectItem value="flexible">Horario Flexible</SelectItem>
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
                  rules={{
                    required: "Disponibilidad para ingreso es requerida",
                  }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="disponibilidadIngreso"
                    >
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
                {errors.disponibilidadIngreso && (
                  <p className="text-red-500 dark:text-amber-400 text-xs">
                    {errors.disponibilidadIngreso.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentacion">
                Breve Presentación Personal *
              </Label>
              <Controller
                name="presentacion"
                control={control}
                rules={{
                  required: "Presentación personal es requerida",
                  minLength: {
                    value: 50,
                    message:
                      "La presentación debe tener al menos 50 caracteres",
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
                    name="presentacion"
                    {...field}
                    placeholder="Describa brevemente quién es usted, sus fortalezas y qué puede aportar a la empresa. Sea específico y conciso."
                    className="min-h-[120px]"
                    maxLength={1000}
                  />
                )}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Máximo 1000 caracteres</span>
                <span>{watch("presentacion", "").length}/1000</span>
              </div>
              {errors.presentacion && (
                <p className="text-red-500 dark:text-amber-400 text-xs">
                  {errors.presentacion.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sección: Experiencia Laboral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Experiencia Laboral
            </CardTitle>
            <CardDescription>
              Información sobre su experiencia laboral anterior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={sinExperiencia ? "destructive" : "outline"}
                onClick={handleSinExperiencia}
                className="mb-4"
                name="btnSinExperiencia"
              >
                No tengo Experiencia Laboral
              </Button>
              {sinExperiencia && (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Controller
                    name="sinExperiencia"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        className="hidden"
                        name="sinExperienciaCheckbox" // Nombre para el checkbox
                      />
                    )}
                  />
                  ✓ Se registrará como &quot;Sin Experiencia&quot;
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experienciaLaboral">
                  Empresa de Última Experiencia
                </Label>
                <Input
                  id="experienciaLaboral"
                  name="experienciaLaboral"
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

              <div className="space-y-2">
                <Label htmlFor="cargoAnterior">Cargo Desempeñado</Label>
                <Input
                  id="cargoAnterior"
                  name="cargoAnterior"
                  {...register("cargoAnterior")}
                  placeholder="Título del cargo que desempeñó"
                  disabled={sinExperiencia}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laboresAnteriores">
                  Descripción de Labores
                </Label>
                <Textarea
                  id="laboresAnteriores"
                  name="laboresAnteriores"
                  {...register("laboresAnteriores")}
                  placeholder="Describa las principales funciones y responsabilidades que tenía en su cargo anterior"
                  className="min-h-[100px]"
                  disabled={sinExperiencia}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Carga de Currículum */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> {/* Puedes cambiar el ícono si prefieres */}
              Cargar Currículum
            </CardTitle>
            <CardDescription>
              Adjunte su resumen curricular en formato PDF (máximo 5MB).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="curriculum">Archivo PDF *</Label>
            <Input
              id="curriculum"
              name="curriculum"
              type="file"
              accept=".pdf"
              {...register("curriculum", {
                validate: {
                  required: (value) =>
                    (value && value.length > 0) || "Currículum es requerido",
                  isPdf: (value) =>
                    (value &&
                      value[0] &&
                      value[0].type === "application/pdf") ||
                    "Solo se permiten archivos PDF",
                  maxSize: (value) =>
                    (value && value[0] && value[0].size <= 5 * 1024 * 1024) || // 5MB
                    "El archivo no debe exceder 5MB",
                },
              })}
            />
            {fileName && <p className="text-sm text-muted-foreground">Archivo seleccionado: {fileName}</p>}
            {errors.curriculum && (
              <p className="text-red-500 dark:text-amber-400 text-xs">{errors.curriculum.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Botón de Envío */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-12 py-3 text-lg flex items-center gap-2"
            disabled={!isValid} // Deshabilitar si el formulario no es válido
          >
            <Send className="w-5 h-5" />
            Enviar Postulación
          </Button>
        </div>
      </form>
    </div>
  );
}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el departamento" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {departamentos.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nivelEducativo">Nivel Educativo *</Label>
                <Select
                  value={formData.nivelEducativo}
                  onValueChange={(value) =>
                    handleInputChange("nivelEducativo", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="bachiller">Bachiller</SelectItem>
                    <SelectItem value="tecnico">Técnico Superior</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                    <SelectItem value="postgrado">Postgrado</SelectItem>
                    <SelectItem value="maestria">Maestría</SelectItem>
                    <SelectItem value="doctorado">Doctorado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="disponibilidadHorario">
                  Disponibilidad de Horario *
                </Label>
                <Select
                  value={formData.disponibilidadHorario}
                  onValueChange={(value) =>
                    handleInputChange("disponibilidadHorario", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="tiempo_completo">
                      Tiempo Completo
                    </SelectItem>
                    <SelectItem value="medio_tiempo">Medio Tiempo</SelectItem>
                    <SelectItem value="por_horas">Por Horas</SelectItem>
                    <SelectItem value="fines_semana">
                      Fines de Semana
                    </SelectItem>
                    <SelectItem value="flexible">Horario Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectativaSalarial">
                  Expectativa Salarial (USD) *
                </Label>
                <Input
                  id="expectativaSalarial"
                  type="number"
                  min="0"
                  value={formData.expectativaSalarial}
                  onChange={(e) =>
                    handleInputChange("expectativaSalarial", e.target.value)
                  }
                  placeholder="Monto en USD"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentacion">
                Breve Presentación Personal *
              </Label>
              <Textarea
                id="presentacion"
                value={formData.presentacion}
                onChange={(e) =>
                  handleInputChange("presentacion", e.target.value)
                }
                placeholder="Describa brevemente quién es usted, sus fortalezas y qué puede aportar a la empresa. Sea específico y conciso."
                className="min-h-[120px]"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Máximo 500 caracteres</span>
                <span>{formData.presentacion.length}/500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Experiencia Laboral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Experiencia Laboral
            </CardTitle>
            <CardDescription>
              Información sobre su experiencia laboral anterior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={formData.sinExperiencia ? "default" : "outline"}
                onClick={handleSinExperiencia}
                className="mb-4"
              >
                No tengo Experiencia Laboral
              </Button>
              {formData.sinExperiencia && (
                <span className="text-green-600 text-sm">
                  ✓ Se registrará como "Sin Experiencia"
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experienciaLaboral">
                  Empresa de Última Experiencia
                </Label>
                <Input
                  id="experienciaLaboral"
                  value={formData.experienciaLaboral}
                  onChange={(e) =>
                    handleInputChange("experienciaLaboral", e.target.value)
                  }
                  placeholder="Nombre de la empresa"
                  disabled={formData.sinExperiencia}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargoAnterior">Cargo Desempeñado</Label>
                <Input
                  id="cargoAnterior"
                  value={formData.cargoAnterior}
                  onChange={(e) =>
                    handleInputChange("cargoAnterior", e.target.value)
                  }
                  placeholder="Título del cargo que desempeñó"
                  disabled={formData.sinExperiencia}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laboresAnteriores">
                  Descripción de Labores
                </Label>
                <Textarea
                  id="laboresAnteriores"
                  value={formData.laboresAnteriores}
                  onChange={(e) =>
                    handleInputChange("laboresAnteriores", e.target.value)
                  }
                  placeholder="Describa las principales funciones y responsabilidades que tenía en su cargo anterior"
                  className="min-h-[100px]"
                  disabled={formData.sinExperiencia}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón de Envío */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-12 py-3 text-lg flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Postulación
          </Button>
        </div>
      </form>
    </div>
  );
}
