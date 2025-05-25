import PersonalSection from "@/components/forms/sections/PersonalSection";
import ProgressBarSimple from "@/components/layout/ProgressBar";

export default function DatosPersonalesPage() {
  return (
    <>
      <ProgressBarSimple currentStep={1} />
      <PersonalSection />
    </>
  );
}
