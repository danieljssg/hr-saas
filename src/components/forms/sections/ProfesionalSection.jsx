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
  const [formData, setFormData] = useState({
    departamento: "",
    presentacion: "",
    nivelEducativo: "",
    disponibilidadHorario: "",
    expectativaSalarial: "",
  });

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        departamento: parsedData.departamento || "",
        presentacion: parsedData.presentacion || "",
        nivelEducativo: parsedData.nivelEducativo || "",
        disponibilidadHorario: parsedData.disponibilidadHorario || "",
        expectativaSalarial: parsedData.expectativaSalarial || "",
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
      formData.departamento &&
      formData.presentacion &&
      formData.nivelEducativo &&
      formData.disponibilidadHorario &&
      formData.expectativaSalarial &&
      formData.presentacion.length >= 50
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      // Marcar paso como completado
      const completedSteps = JSON.parse(
        localStorage.getItem("completedSteps") || "[]"
      );
      if (!completedSteps.includes(3)) {
        completedSteps.push(3);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      }
      router.push("/postulacion/experiencia");
    }
  };

  return (
    <div className="space-y-6">
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
                  <SelectItem value="fines_semana">Fines de Semana</SelectItem>
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
            <Label htmlFor="presentacion">Breve Presentación Personal *</Label>
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
              <span>
                Mínimo 50 caracteres. Sea lo más breve, detallado y específico
                posible.
              </span>
              <span>{formData.presentacion.length}/500</span>
            </div>
            {formData.presentacion.length > 0 &&
              formData.presentacion.length < 50 && (
                <p className="text-red-500 text-sm">
                  La presentación debe tener al menos 50 caracteres
                </p>
              )}
          </div>
        </CardContent>
      </Card>

      <StepNavigationSimple
        currentStep={3}
        onNext={handleNext}
        canProceed={validateForm()}
      />
    </div>
  );
}
