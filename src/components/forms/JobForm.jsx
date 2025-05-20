"use client";

import { useState, useActionState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import initialState from "@/utils/initialState";
import { NewJobAction } from "@/utils/actions";
import useToastRedirect from "@/hooks/useToastRedirect";
import toast from "react-hot-toast";

const positions = [
  { id: 1, name: "Gerente General" },
  { id: 2, name: "Desarrollador Frontend" },
  { id: 3, name: "Desarrollador Backend" },
  { id: 4, name: "Diseñador UX/UI" },
  { id: 5, name: "Analista de Datos" },
];

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
    <form action={formAction} className="flex flex-col gap-4 p-4">
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
        <Label htmlFor="pdfFile">Archivo PDF</Label>
        <Input
          id="pdfFile"
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <p className="text-sm text-muted-foreground">
          Solo se permiten archivos PDF
        </p>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Subiendo..." : "Subir Archivo"}
      </Button>
    </form>
  );
};
