import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FilterBySuitability = ({ table }) => {
  return (
    <div className="w-[200px]">
      <Select
        value={
          table.getColumn("suitable")?.getFilterValue() === undefined
            ? ""
            : table.getColumn("suitable")?.getFilterValue().toString()
        }
        onValueChange={(value) => {
          if (value === "all") {
            table.getColumn("suitable")?.setFilterValue(undefined);
          } else {
            table.getColumn("suitable")?.setFilterValue(value === "true");
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nivel de Competencia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="true">Apto</SelectItem>
          <SelectItem value="false">No Apto</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
