import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupGender({
  control,
  name,
  label,
  rules,
  errors,
  className,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className || "w-full"}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <RadioGroup
            {...props} // Pasa props adicionales como onValueChange, value si es necesario directamente al RadioGroup
            onValueChange={field.onChange}
            value={field.value || ""}
            className="flex flex-row space-x-4 pt-2" // Añadido pt-2 para alinear con otros inputs si el label está arriba
            id={name}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masculino" id={`${name}-masculino`} />
              <Label htmlFor={`${name}-masculino`}>Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="femenino" id={`${name}-femenino`} />
              <Label htmlFor={`${name}-femenino`}>Femenino</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-amber-400 text-xs">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
