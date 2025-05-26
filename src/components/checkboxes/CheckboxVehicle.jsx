import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxVehicle({
  control,
  name,
  label,
  rules,
  errors,
  checkboxLabel,
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
          <div className="flex items-center space-x-2 pt-2">
            {" "}
            {/* pt-2 para alinear si el label principal está arriba */}
            <Checkbox
              {...props}
              id={name} // Usar el 'name' como id para el checkbox principal
              checked={field.value || false}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={name} className="font-normal">
              {" "}
              {/* Usar el mismo id para que el click en el label active el checkbox */}
              {checkboxLabel || "Sí"}
            </Label>
          </div>
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
