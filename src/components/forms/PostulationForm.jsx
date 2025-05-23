"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, User, MapPin, Briefcase, Phone } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

export const PostulationForm = () => {
  const [formData, setFormData] = useState({
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
    correo: "",
    telefono: "",
    direccion: "",
    departamento: "",
    presentacion: "",
    experienciaLaboral: "",
    cargoAnterior: "",
    laboresAnteriores: "",
    nivelEducativo: "",
    disponibilidadHorario: "",
    expectativaSalarial: "",
  });

  const [sinExperiencia, setSinExperiencia] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSinExperiencia = () => {
    setSinExperiencia(!sinExperiencia);
    if (!sinExperiencia) {
      setFormData((prev) => ({
        ...prev,
        experienciaLaboral: "Sin Experiencia",
        cargoAnterior: "",
        laboresAnteriores: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        experienciaLaboral: "",
        cargoAnterior: "",
        laboresAnteriores: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí iría la lógica para enviar los datos
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Formulario de Captación de Talento
        </h1>
        <p className="">
          Complete todos los campos para postularse a nuestra empresa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Datos básicos del candidato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                <Select
                  value={formData.tipoDocumento}
                  onValueChange={(value) =>
                    handleInputChange("tipoDocumento", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="V">V - Venezolano</SelectItem>
                    <SelectItem value="E">E - Extranjero</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="numeroDocumento">Número de Cédula/DNI *</Label>
                <Input
                  id="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={(e) =>
                    handleInputChange("numeroDocumento", e.target.value)
                  }
                  placeholder="Ingrese su número de documento"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    handleInputChange("apellido", e.target.value)
                  }
                  placeholder="Ingrese su apellido"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => handleInputChange("estado", value)}
                  required
                >
                  <SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => handleInputChange("ciudad", e.target.value)}
                  placeholder="Ingrese su ciudad"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Género *</Label>
                <RadioGroup
                  value={formData.genero}
                  onValueChange={(value) => handleInputChange("genero", value)}
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="edad">Edad *</Label>
                <Input
                  id="edad"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.edad}
                  onChange={(e) => handleInputChange("edad", e.target.value)}
                  placeholder="Edad"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Nacimiento *</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.fechaNacimiento
                        ? format(formData.fechaNacimiento, "dd/MM/yyyy", {
                            locale: es,
                          })
                        : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.fechaNacimiento}
                      onSelect={(date) => {
                        handleInputChange("fechaNacimiento", date);
                        setCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estadoCivil">Estado Civil *</Label>
                <Select
                  value={formData.estadoCivil}
                  onValueChange={(value) =>
                    handleInputChange("estadoCivil", value)
                  }
                  required
                >
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
              </div>
              <div className="space-y-2">
                <Label>¿Posee vehículo propio?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vehiculo"
                    checked={formData.poseeVehiculo}
                    onCheckedChange={(checked) =>
                      handleInputChange("poseeVehiculo", checked)
                    }
                  />
                  <Label htmlFor="vehiculo">Sí, poseo vehículo propio</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información de Contacto */}
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
                  type="email"
                  value={formData.correo}
                  onChange={(e) => handleInputChange("correo", e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) =>
                    handleInputChange("telefono", e.target.value)
                  }
                  placeholder="0414-1234567"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección *</Label>
              <Textarea
                id="direccion"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Ingrese su dirección completa de forma breve"
                className="min-h-[80px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Información Académica y Profesional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Información Académica y Profesional
            </CardTitle>
            <CardDescription>
              Datos sobre su formación y aspiraciones laborales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento de Interés *</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) =>
                    handleInputChange("departamento", value)
                  }
                  required
                >
                  <SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="nivelEducativo">Nivel Educativo *</Label>
                <Select
                  value={formData.nivelEducativo}
                  onValueChange={(value) =>
                    handleInputChange("nivelEducativo", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
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
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
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
                required
              />
              <p className="text-sm text-gray-500">
                Máximo 500 caracteres. Sea lo más breve, detallado y específico
                posible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Experiencia Laboral */}
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
                variant={sinExperiencia ? "default" : "outline"}
                onClick={handleSinExperiencia}
                className="mb-4"
              >
                No tengo Experiencia Laboral
              </Button>
              {sinExperiencia && (
                <span className="text-red-500 text-sm">
                  Se tomará por defecto "Sin Experiencia"
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
                  disabled={sinExperiencia}
                />
                {!sinExperiencia && formData.experienciaLaboral === "" && (
                  <span className="text-red-500 text-sm">
                    Si no llena este campo se tomará por defecto "Sin
                    Experiencia"
                  </span>
                )}
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
                  disabled={sinExperiencia}
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
                  disabled={sinExperiencia}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón de Envío */}
        <div className="flex justify-center">
          <Button type="submit" size="lg" className="w-full md:w-auto px-8">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  );
};
