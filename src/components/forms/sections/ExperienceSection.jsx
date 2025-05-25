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
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle } from "lucide-react";
import StepNavigationSimple from "@/components/layout/StepNavigation";

export default function ExperienceSection() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    experienciaLaboral: "",
    cargoAnterior: "",
    laboresAnteriores: "",
    sinExperiencia: false,
  });

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("talentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        experienciaLaboral: parsedData.experienciaLaboral || "",
        cargoAnterior: parsedData.cargoAnterior || "",
        laboresAnteriores: parsedData.laboresAnteriores || "",
        sinExperiencia: parsedData.sinExperiencia || false,
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

  const validateForm = () => {
    return formData.sinExperiencia || formData.experienciaLaboral.trim() !== "";
  };

  const handleFinish = () => {
    const finalData = { ...formData };
    if (!formData.sinExperiencia && formData.experienciaLaboral.trim() === "") {
      finalData.experienciaLaboral = "Sin Experiencia";
      finalData.sinExperiencia = true;
    }

    // Actualizar localStorage con datos finales
    const savedData = localStorage.getItem("talentFormData");
    const currentData = savedData ? JSON.parse(savedData) : {};
    const updatedData = { ...currentData, ...finalData };
    localStorage.setItem("talentFormData", JSON.stringify(updatedData));

    // Marcar paso como completado
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes(4)) {
      completedSteps.push(4);
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    // Redirigir a página de revisión
    router.push("/postulacion/revision");
  };

  const handleNewApplication = () => {
    // Limpiar localStorage
    localStorage.removeItem("talentFormData");
    localStorage.removeItem("completedSteps");
    router.push("/postulacion/datospersonales");
  };

  if (showSuccess) {
    return (
      <div className="space-y-6">
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold ">
              ¡Formulario Enviado Exitosamente!
            </h1>
            <p className="">
              Gracias por postularte a nuestra empresa. Hemos recibido tu
              información y nos pondremos en contacto contigo pronto.
            </p>
            <div className="space-y-2">
              <Button onClick={handleNewApplication} className="w-full">
                Nueva Postulación
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold ">Experiencia Laboral</h1>
        <p className="">Información sobre su experiencia laboral anterior</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Experiencia Profesional
          </CardTitle>
          <CardDescription>
            Complete solo si tiene experiencia laboral previa
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
              {!formData.sinExperiencia &&
                formData.experienciaLaboral === "" && (
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
                disabled={formData.sinExperiencia}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="laboresAnteriores">Descripción de Labores</Label>
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

      <StepNavigationSimple
        currentStep={4}
        onNext={handleFinish}
        canProceed={validateForm()}
        isLastStep="review"
      />
    </div>
  );
}
