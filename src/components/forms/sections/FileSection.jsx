"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paperclip } from "lucide-react"; // Ícono más adecuado
import { useEffect, useState } from "react";

export default function FileSection({
  register,
  errors,
  watch,
  inputName,
  inputId,
  title,
  description,
  acceptedFileTypes = ".pdf", // Default to PDF
  maxFileSizeMB = 5, // Default to 5MB
  isRequired = true, // Default to true
}) {
  const [fileName, setFileName] = useState("");
  const watchedFile = watch(inputName);

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      setFileName(watchedFile[0].name);
    } else {
      setFileName("");
    }
  }, [watchedFile]);

  const validateFile = (value) => {
    if (isRequired && (!value || value.length === 0)) {
      return `${title} es requerido`;
    }
    if (value && value.length > 0) {
      const file = value[0];
      const allowedTypes = acceptedFileTypes.split(",").map(type => type.trim());
      // Check if file.type matches any of the mime types derived from acceptedFileTypes
      // This is a basic check, for robust validation, consider mime-type libraries
      const fileExtension = `.${file.name.split('.').pop()}`;
      if (!allowedTypes.includes(fileExtension.toLowerCase()) && !allowedTypes.some(type => file.type.startsWith(type.replace('.', '')))) {
        // A more robust check would involve mapping extensions to MIME types
        // For now, we'll check extension and basic MIME type start
        if (!allowedTypes.some(type => file.type === (type.startsWith('.') ? `application/${type.substring(1)}` : type))) {
           return `Solo se permiten archivos de tipo: ${acceptedFileTypes}`;
        }
      }
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        return `El archivo no debe exceder ${maxFileSizeMB}MB`;
      }
    }
    return true;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <Label htmlFor={inputId}>Archivo {isRequired && "*"}</Label>
        <Input id={inputId} type="file" accept={acceptedFileTypes} {...register(inputName, { validate: validateFile })} />
        {fileName && (
          <p className="text-sm text-muted-foreground">
            Archivo seleccionado: {fileName}
          </p>
        )}
        {errors[inputName] && (
          <p className="text-red-500 dark:text-amber-400 text-xs">
            {errors[inputName].message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
