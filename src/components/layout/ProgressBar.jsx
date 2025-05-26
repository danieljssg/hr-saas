"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Datos Personales", path: "/postulacion/datospersonales" },
  { id: 2, name: "Contacto", path: "/postulacion/contacto" },
  { id: 3, name: "Info Profesional", path: "/postulacion/infoprofesional" },
  { id: 4, name: "Experiencia Laboral", path: "/postulacion/explaboral" },
];

export default function ProgressBarSimple({ currentStep }) {
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("completedSteps");
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, []);

  const getProgressPercentage = () => {
    return (completedSteps.length / steps.length) * 100;
  };

  const isStepCompleted = (step) => {
    return completedSteps.includes(step);
  };

  return (
    <div className="w-full  p-6 shadow-sm">
      <div className=" mx-auto">
        <div className="mb-4">
          <div className="flex justify-between text-sm  mb-2">
            <span>Progreso del formulario</span>
            <span>{Math.round(getProgressPercentage())}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : isStepCompleted(step.id)
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 "
                  }`}
                >
                  {isStepCompleted(step.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 ml-2 ${
                      isStepCompleted(step.id) ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
              <span className="text-xs  mt-2 text-center max-w-20">
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
