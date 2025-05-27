"use client";

import { useState } from "react"; // useEffect ya no es necesario para localStorage
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import PersonalSection from "./PersonalSection";
import ContactSection from "./ContactSection";
import ProfesionalSection from "./ProfesionalSection";
import ExperienceSection from "./ExperienceSection";
import FileSection from "./FileSection";

export default function CheckSection() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Valores iniciales directos, ya no desde localStorage
      tipoDocumento: "",
      numeroDocumento: "",
      nombre: "",
      apellido: "",
      estado: "",
      ciudad: "",
      genero: "",
      fechaNacimiento: null,
      estadoCivil: "",
      poseeVehiculo: false,
      correo: "",
      telefono: "",
      direccion: "",
      departamento: "",
      presentacion: "",
      nivelEducativo: "",
      disponibilidadHorario: "",
      disponibilidadIngreso: "",
      experienciaLaboral: "",
      cargoAnterior: "",
      laboresAnteriores: "",
      sinExperiencia: false,
      curriculum: null,
      documentoIdentidad: null, // Nuevo campo para documento de identidad
      rifFile: null, // Nuevo campo para RIF
    },
  });

  const onSubmit = async (data) => {
    const formDataToSubmit = new FormData();

    // Ajustar datos de experiencia si es necesario (aunque ExperienceSection ya lo maneja)
    if (data.sinExperiencia) {
      data.experienciaLaboral = "No Aplica";
      data.cargoAnterior = "Sin Experiencia";
      data.laboresAnteriores = "No cuenta con experiencia profesional";
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Manejo genérico para campos de archivo (FileLists)
        if (data[key] instanceof FileList && data[key].length > 0) {
          formDataToSubmit.append(key, data[key][0]);
        } else if (key === "fechaNacimiento" && data[key] instanceof Date) {
          formDataToSubmit.append(key, data[key].toISOString());
        } else if (
          data[key] !== null &&
          data[key] !== undefined &&
          !(data[key] instanceof FileList)
        ) {
          formDataToSubmit.append(key, String(data[key]));
        }
      }
    }

    console.log("FormData a enviar desde CheckSection:");
    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }

    toast.success(
      "Postulación enviada con éxito (simulación). Revisa la consola."
    );
    setShowSuccess(true);

    // Ya no se interactúa con localStorage aquí
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6 py-12">
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold ">
              ¡Postulación Enviada Exitosamente!
            </h1>
            <p className="">
              Gracias por postularte. Hemos recibido tu información.
            </p>
            <div className="space-y-2 mt-6">
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  reset({
                    // Resetear a los valores iniciales definidos
                    tipoDocumento: "",
                    numeroDocumento: "",
                    nombre: "",
                    apellido: "",
                    estado: "",
                    ciudad: "",
                    genero: "",
                    fechaNacimiento: null,
                    estadoCivil: "",
                    poseeVehiculo: false,
                    correo: "",
                    telefono: "",
                    direccion: "",
                    departamento: "",
                    presentacion: "",
                    nivelEducativo: "",
                    disponibilidadHorario: "",
                    disponibilidadIngreso: "",
                    experienciaLaboral: "",
                    cargoAnterior: "",
                    laboresAnteriores: "",
                    sinExperiencia: false,
                    curriculum: null,
                    documentoIdentidad: null, // Resetear nuevo campo
                    rifFile: null, // Resetear campo RIF
                  });
                }}
                className="w-full"
              >
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

  const sectionProps = { control, register, errors, watch, setValue };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold ">
          {" "}
          Formulario de Captación de Talento
        </h1>
        <p className="text-muted-foreground">
          Complete todos los campos para postularse a nuestra empresa
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <PersonalSection {...sectionProps} />

        <ContactSection {...sectionProps} />

        <ProfesionalSection {...sectionProps} />

        <ExperienceSection {...sectionProps} />

        <FileSection
          {...sectionProps}
          inputName="curriculum"
          inputId="curriculum-file"
          title="Cargar Currículum"
          description="Adjunte su resumen curricular en formato."
          acceptedFileTypes=".pdf"
          maxFileSizeMB={5}
          isRequired={true}
        />

        <FileSection
          {...sectionProps}
          inputName="documentoIdentidad"
          inputId="documento-identidad-file"
          title="Cargar Documento de Identidad"
          description="Adjunte su documento de identidad (PDF, JPG, PNG, DOC, DOCX)."
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          maxFileSizeMB={2}
          isRequired={true} // Ejemplo de campo opcional
        />

        <FileSection
          {...sectionProps}
          inputName="rifFile"
          inputId="rif-file"
          title="Cargar RIF"
          description="Adjunte su Registro de Información Fiscal (RIF) en formato PDF, JPG o PNG."
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          maxFileSizeMB={2}
          isRequired={true} // Puedes cambiarlo a false si es opcional
        />

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-12 py-3 text-lg flex items-center gap-2"
            disabled={!isValid}
          >
            <Send className="w-5 h-5" />
            Enviar Postulación
          </Button>
        </div>
      </form>
    </div>
  );
}
