/**
 * App Component — Thin Component (equivalent to Thin Controller)
 * 
 * Single Responsibility: ONLY handles layout composition.
 * All logic has been moved to:
 *   - Context Layer (AppContext) — state management
 *   - Hooks Layer — business logic
 *   - Repository Layer — data access
 * 
 * This component is now a pure "View" — it only decides
 * WHAT to render, not HOW things work.
 */
import { AppProvider } from './context/AppProvider';
import { useApp } from './hooks/useApp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollTop from './components/ScrollTop';
import './App.css';

/**
 * AppContent — The main layout component.
 * Separated from App to access context after Provider wraps it.
 */
function AppContent() {
  const { loading } = useApp();

  if (loading) return <Loader />;

  return (
    <>
      <a href="#about" className="skip-to-content">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <a
        href="https://wa.me/966532971052"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <ScrollTop />
    </>
  );
}

/**
 * App — Root component.
 * Only wraps AppContent with the Provider (Dependency Injection root).
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
