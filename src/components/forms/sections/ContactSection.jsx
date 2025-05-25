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
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    correo: "",
    telefono: "",
    direccion: "",
  });

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        correo: parsedData.correo || "",
        telefono: parsedData.telefono || "",
        direccion: parsedData.direccion || "",
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
      formData.correo &&
      formData.telefono &&
      formData.direccion &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      // Marcar paso como completado
      const completedSteps = JSON.parse(
        localStorage.getItem("completedSteps") || "[]"
      );
      if (!completedSteps.includes(2)) {
        completedSteps.push(2);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      }
      router.push("/postulacion/infoprofesional");
    }
  };

  return (
    <div className="space-y-6">
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
              {formData.correo &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo) && (
                  <p className="text-red-500 text-sm">
                    Ingrese un correo válido
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
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

      <StepNavigationSimple
        currentStep={2}
        onNext={handleNext}
        canProceed={validateForm()}
      />
    </div>
  );
}
