import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Dock from "@/components/Dock";
import ParticleBackground from "@/components/ThreeBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-transparent">
      <ParticleBackground />
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
      </main>
      <Footer />
      <Dock />
    </div>
  );
}
