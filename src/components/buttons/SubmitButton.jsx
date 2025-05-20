import { Button } from "@/components/ui/button";
import { SaveIcon, Loader2 } from "lucide-react";

export const SubmitButton = ({ text, loading }) => {
  return (
    <Button type="submit" className="w-full" size="lg" disabled={loading}>
      {!loading ? <SaveIcon /> : <Loader2 className="animate-spin" />}
      {text}
    </Button>
  );
};
