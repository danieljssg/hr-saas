"use client";

import { useState, useEffect } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import StepNavigationSimple from "@/components/layout/StepNavigation";

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
  const [calendarOpen, setCalendarOpen] = useState(false);
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
  });

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
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
      });
    }
  }, []);

  // Guardar en localStorage cada vez que cambie formData
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    const currentData = savedData ? JSON.parse(savedData) : {};
    const updatedData = { ...currentData, ...formData };
    localStorage.setItem("talentFormData", JSON.stringify(updatedData));
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    return (
      formData.tipoDocumento &&
      formData.numeroDocumento &&
      formData.nombre &&
      formData.apellido &&
      formData.estado &&
      formData.ciudad &&
      formData.genero &&
      formData.edad &&
      formData.fechaNacimiento &&
      formData.estadoCivil
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      // Marcar paso como completado
      const completedSteps = JSON.parse(
        localStorage.getItem("completedSteps") || "[]"
      );
      if (!completedSteps.includes(1)) {
        completedSteps.push(1);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      }
      router.push("/postulacion/contacto");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold ">Datos Personales</h1>
        <p className="">Complete su información personal básica</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Todos los campos son obligatorios</CardDescription>
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
                onChange={(e) => handleInputChange("apellido", e.target.value)}
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

      <StepNavigationSimple
        currentStep={1}
        onNext={handleNext}
        canProceed={validateForm()}
      />
    </div>
  );
}
