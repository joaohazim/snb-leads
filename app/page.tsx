"use client";

import { Header } from "@/components/ui/header";
import { HeroPortoAlgarve } from "@/components/ui/hero-porto-algarve";
import { HeroPortoRiviera } from "@/components/ui/hero-porto-riviera";
import { SectionDivider } from "@/components/ui/section-divider";
import { ContactForm } from "@/components/ui/contact-form";

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header */}
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section - Porto Algarve */}
        <HeroPortoAlgarve onContactClick={scrollToContact} />
      
      {/* Hero Section - Porto Riviera */}
      <HeroPortoRiviera onContactClick={scrollToContact} />
      
      {/* Section Divider */}
      <SectionDivider onContactClick={scrollToContact} />
      
      {/* Contact Form Section */}
      <ContactForm />
      </main>
    </>
  );
}