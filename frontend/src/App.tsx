import { CommitGraph } from "./components/CommitGraph";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Lenses } from "./components/Lenses";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Path } from "./components/Path";
import { Projects } from "./components/Projects";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Lenses />
        <CommitGraph />
        <Path />
        <Marquee text="WORK · PROJECTS · WORK · PROJECTS" tone="lime" />
        <Projects />
        <Marquee text="CONTACT KAILEE · CONTACT KAILEE" tone="white" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
