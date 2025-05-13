import { CandidatesDataTable } from "@/components/DataTables/CandidatesDataTable";
import { CandidatesColumns } from "@/components/DataTables/columns/CandidatesColumns";

export default function Page() {
  return <CandidatesDataTable columns={CandidatesColumns} />;
}
