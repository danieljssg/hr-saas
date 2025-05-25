import ContactSection from "@/components/forms/sections/ContactSection";
import ProgressBarSimple from "@/components/layout/ProgressBar";

export default function ContactoPage() {
  return (
    <>
      <ProgressBarSimple currentStep={2} />
      <ContactSection />
    </>
  );
}
