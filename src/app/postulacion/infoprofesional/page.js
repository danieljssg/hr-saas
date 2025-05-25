import ProfesionalSection from "@/components/forms/sections/ProfesionalSection";
import ProgressBarSimple from "@/components/layout/ProgressBar";

export default function InfoProfesionalPage() {
  return (
    <>
      <ProgressBarSimple currentStep={3} />
      <ProfesionalSection />
    </>
  );
}
