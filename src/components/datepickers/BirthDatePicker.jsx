"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const BirthDatePicker = ({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentGlobalYear = new Date().getFullYear();
  const maxBirthYear = currentGlobalYear - 15; // Año de nacimiento más reciente permitido
  const minBirthYear = 1924; // Año de nacimiento más antiguo permitido

  // Generar años para el selector, desde maxBirthYear hasta minBirthYear
  const yearsRange = Array.from(
    { length: maxBirthYear - minBirthYear + 1 },
    (_, i) => maxBirthYear - i
  );

  // Estado para el mes/año que se muestra en el calendario y los selectores
  const [displayMonth, setDisplayMonth] = useState(() => {
    if (value instanceof Date && !isNaN(value)) {
      const valueYear = value.getFullYear();
      // Si el valor está dentro del rango permitido, usarlo para la vista inicial
      if (valueYear <= maxBirthYear && valueYear >= minBirthYear) {
        return new Date(value.getFullYear(), value.getMonth(), 1);
      }
    }
    // Default: mes actual del año máximo permitido, o un mes fijo como Enero del maxBirthYear.
    return new Date(maxBirthYear, new Date().getMonth(), 1);
  });
  // Meses en español
  const months = [
    { value: 0, label: "Enero" },
    { value: 1, label: "Febrero" },
    { value: 2, label: "Marzo" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Mayo" },
    { value: 5, label: "Junio" },
    { value: 6, label: "Julio" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Septiembre" },
    { value: 9, label: "Octubre" },
    { value: 10, label: "Noviembre" },
    { value: 11, label: "Diciembre" },
  ];

  useEffect(() => {
    let newDisplayDate;
    if (value instanceof Date && !isNaN(value)) {
      const valueYear = value.getFullYear();
      if (valueYear <= maxBirthYear && valueYear >= minBirthYear) {
        newDisplayDate = new Date(value.getFullYear(), value.getMonth(), 1);
      } else if (valueYear > maxBirthYear) {
        newDisplayDate = new Date(maxBirthYear, 11, 1); // Diciembre del maxBirthYear
      } else {
        newDisplayDate = new Date(minBirthYear, 0, 1); // Enero del minBirthYear
      }
    } else {
      newDisplayDate = new Date(maxBirthYear, new Date().getMonth(), 1);
    }

    if (
      newDisplayDate.getFullYear() !== displayMonth.getFullYear() ||
      newDisplayDate.getMonth() !== displayMonth.getMonth()
    ) {
      setDisplayMonth(newDisplayDate);
    }
  }, [value, maxBirthYear, minBirthYear]); // No incluir displayMonth para evitar bucles innecesarios

  const handleYearChange = (year) => {
    setDisplayMonth(
      new Date(Number.parseInt(year), displayMonth.getMonth(), 1)
    );
  };

  const handleMonthChange = (month) => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), Number.parseInt(month), 1)
    );
  };
  const handleDateSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="justify-start text-left font-normal border   rounded-lg  px-3 py-1.5 flex items-center cursor-pointer bg-accent hover:bg-input/50 hover:border-muted-foreground">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd/MM/yyyy", { locale: es }) : placeholder}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          month={displayMonth} // Controla el mes/año visible en el calendario
          onMonthChange={setDisplayMonth} // Se actualiza si el usuario navega con las flechas del calendario
          disabled={(date) =>
            // Deshabilitar fechas fuera del rango de años permitido
            date.getFullYear() > maxBirthYear ||
            date.getFullYear() < minBirthYear
          }
          locale={es}
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption:
              "flex justify-center pt-1 relative items-center capitalize",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "transition-colors duration-100 ease-in-out hover:bg-primary/30 rounded-md text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md",
            day_selected: "bg-primary text-white hover:bg-primary/80 ",
            day_today: "text-accent-foreground border-2 border-primary",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
          }}
        />
        <div className="p-2 border-t">
          <div className="flex items-center justify-between gap-2">
            <Select
              value={displayMonth.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {yearsRange.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={displayMonth.getMonth().toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
