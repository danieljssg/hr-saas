import { Input } from "@/components/ui/input";

export const FilterByName = ({ table }) => {
  return (
    <div className="flex-1">
      <Input
        placeholder="Búsqueda por nombre"
        value={table.getColumn("name")?.getFilterValue() || ""}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};
