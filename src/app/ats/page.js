import { CandidatesDataTable } from "@/components/DataTables/CandidatesDataTable";
import { CandidatesColumns } from "@/components/DataTables/columns/CandidatesColumns";
import { getCandidates } from "@/utils/data";

export default async function Page() {
  const data = await getCandidates();

  return <CandidatesDataTable columns={CandidatesColumns} candidates={data} />;
}
