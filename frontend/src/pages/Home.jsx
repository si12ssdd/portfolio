import { useState } from 'react';
import Loader from '../components/Loader.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Experience from '../components/Experience.jsx';
import Certifications from '../components/Certifications.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          {/* Background mesh stays fixed */}
          <div className="mesh-bg noise-overlay">
            <div className="glow-blob blob-purple" />
            <div className="glow-blob blob-orange" />
            <div className="glow-blob blob-blue" />
          </div>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
