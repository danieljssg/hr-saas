import { Input } from "@/components/ui/input";

export const FilterCandidateName = ({ table }) => {
  return (
    <div className="flex-1">
      <Input
        placeholder="Búsqueda por nombre"
        value={table.getColumn("candidate_name")?.getFilterValue() || ""}
        onChange={(e) =>
          table.getColumn("candidate_name")?.setFilterValue(e.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};
