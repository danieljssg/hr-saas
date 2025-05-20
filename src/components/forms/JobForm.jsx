"use client";

import { useState, useActionState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import initialState from "@/utils/initialState";
import { NewJobAction } from "@/utils/actions";
import useToastRedirect from "@/hooks/useToastRedirect";
import toast from "react-hot-toast";
import { SubmitButton } from "../buttons/SubmitButton";

export const JobForm = () => {
  const [position, setPosition] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, formAction, pending] = useActionState(
    NewJobAction,
    initialState
  );
  useToastRedirect(state, "/");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Por favor seleccione un archivo PDF");
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-4 p-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="jobName">Nombre del Cargo</Label>
        <Input
          id="jobName"
          name="jobName"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdfFile">Descripción del Cargo</Label>
        <p className="text-xs text-muted-foreground">
          Solo se permiten archivos PDF
        </p>
        <Input
          id="pdfFile"
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hover:cursor-pointer hover:bg-primary/70"
          required
        />
        <p className="text-xs text-muted-foreground text-justify">
          Cargue el archivo PDF con el descriptivo de Cargo, ésto extraerá los
          puntos más importantes, sus objetivos, responsabilidades,
          competencias, requisitos, etc, mediante análisis con IA.
        </p>
      </div>

      <SubmitButton text="Crear Cargo" loading={pending} />
    </form>
  );
};
