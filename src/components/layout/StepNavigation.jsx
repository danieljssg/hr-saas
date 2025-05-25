"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stepRoutes = [
  "/postulacion/datospersonales",
  "/postulacion/contacto",
  "/postulacion/infoprofesional",
  "/postulacion/explaboral",
];

export default function StepNavigationSimple({
  currentStep,
  onNext,
  canProceed = true,
  isLastStep = false,
}) {
  const router = useRouter();

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(stepRoutes[currentStep - 2]);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>

      <div className="text-sm text-gray-500">Paso {currentStep} de 4</div>

      <Button
        type="button"
        onClick={handleNext}
        disabled={!canProceed}
        className="flex items-center gap-2"
      >
        {isLastStep ? "Finalizar" : "Siguiente"}
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );
}
