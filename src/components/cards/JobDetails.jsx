import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export const JobDetails = ({ job, isOpen, openChange }) => {
  if (!job) {
    // Este caso no debería ocurrir si se llama desde JobDataTable,
    // ya que se renderiza condicionalmente. Es una salvaguarda.
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogContent className="min-w-[80dvw] max-w-[90dvw]">
        <DialogHeader>
          <DialogTitle>{job?.name || "Detalles del Cargo"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <JobItem title="Código:" text={job?.code || "N/A"} />
            <JobItem title="Nivel en Organigrama:" text={job?.level || "N/A"} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Descripción del Cargo:
            </h3>
            <div className="mb-3 p-3 text-xs bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 rounded-md text-amber-800 dark:text-amber-200">
              <span className="font-bold">IMPORTANTE:</span> Esta descripción se
              genera mediante el uso de IA, por lo que puede contener errores
              respecto al material original proporcionado en formato PDF.
            </div>
            <ScrollArea className="h-60 overflow-y-auto p-2 rounded-md shadow">
              <MarkdownRenderer
                markdownText={
                  job?.description || "_No hay descripción disponible._"
                }
              />
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const JobItem = ({ title, text }) => {
  return (
    <div className="grid grid-cols-[max-content_1fr] items-baseline gap-x-2">
      <p className="text-sm font-semibold text-muted-foreground">{title}</p>
      <p className="text-sm">{text}</p>
    </div>
  );
};
