"use client";

import { useState, useEffect } from "react";
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Datos Personales
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

    // Contacto
    correo: "",
    telefono: "",
    direccion: "",

    // Info Profesional
    departamento: "",
    presentacion: "",
    nivelEducativo: "",
    disponibilidadHorario: "",
    expectativaSalarial: "",

    // Experiencia Laboral
    experienciaLaboral: "",
    cargoAnterior: "",
    laboresAnteriores: "",
    sinExperiencia: false,
  });

  // Cargar todos los datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        // Datos Personales
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

        // Contacto
        correo: parsedData.correo || "",
        telefono: parsedData.telefono || "",
        direccion: parsedData.direccion || "",

        // Info Profesional
        departamento: parsedData.departamento || "",
        presentacion: parsedData.presentacion || "",
        nivelEducativo: parsedData.nivelEducativo || "",
        disponibilidadHorario: parsedData.disponibilidadHorario || "",
        expectativaSalarial: parsedData.expectativaSalarial || "",

        // Experiencia Laboral
        experienciaLaboral: parsedData.experienciaLaboral || "",
        cargoAnterior: parsedData.cargoAnterior || "",
        laboresAnteriores: parsedData.laboresAnteriores || "",
        sinExperiencia: parsedData.sinExperiencia || false,
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSinExperiencia = () => {
    const newSinExperiencia = !formData.sinExperiencia;
    setFormData((prev) => ({
      ...prev,
      sinExperiencia: newSinExperiencia,
      experienciaLaboral: newSinExperiencia ? "Sin Experiencia" : "",
      cargoAnterior: newSinExperiencia ? "" : prev.cargoAnterior,
      laboresAnteriores: newSinExperiencia ? "" : prev.laboresAnteriores,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualizar localStorage con los datos finales
    localStorage.setItem("talentFormData", JSON.stringify(formData));

    // Aquí iría la lógica de envío
    console.log("Datos finales para envío:", formData);

    // Mostrar mensaje de éxito
    setShowSuccess(true);

    // Simular envío
    setTimeout(() => {
      // Limpiar localStorage después del envío exitoso
      localStorage.removeItem("talentFormData");
      localStorage.removeItem("completedSteps");
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

      <form onSubmit={handleSubmit} className="space-y-8">
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
                <Select
                  value={formData.tipoDocumento}
                  onValueChange={(value) =>
                    handleInputChange("tipoDocumento", value)
                  }
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
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => handleInputChange("estado", value)}
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
                  type="email"
                  value={formData.correo}
                  onChange={(e) => handleInputChange("correo", e.target.value)}
                  placeholder="ejemplo@correo.com"
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
              />
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
                <Select
                  value={formData.departamento}
                  onValueChange={(value) =>
                    handleInputChange("departamento", value)
                  }
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
