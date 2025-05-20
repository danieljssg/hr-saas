import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const useToastRedirect = (state, redirectPath) => {
  const router = useRouter();
  console.log(state);

  useEffect(() => {
    if (state && typeof state.ok === "boolean") {
      if (state.ok === true) {
        toast.success(state.message || "Ok!");
        router.replace(redirectPath);
      } else if (state.ok === false) {
        toast.error(state.message || "Error!");
      }
    }
  }, [state, redirectPath, router]);
};

export default useToastRedirect;
