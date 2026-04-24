import { useState, useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" />;
}

export default function Hero() {
  const { t } = useApp();
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrases = t.typing;
    const current = phrases[phraseIdx % phrases.length];
    const speed = deleting ? 30 : 80;

    if (!deleting && charIdx === current.length) {
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (deleting && charIdx === 0) {
      const timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx(p => (p + 1) % phrases.length);
      }, 500); // 500ms pause before typing next word
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCharIdx(p => p + (deleting ? -1 : 1));
      setText(current.substring(0, charIdx + (deleting ? -1 : 1)));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, t.typing]);

  // Reset state during render when language changes (React recommended pattern)
  const [prevTyping, setPrevTyping] = useState(t.typing);
  if (t.typing !== prevTyping) {
    setPrevTyping(t.typing);
    setText('');
    setCharIdx(0);
    setPhraseIdx(0);
    setDeleting(false);
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-animation"></div>
      <Particles />
      <div className="hero-content">
        <p className="hero-greeting">{t.hero.greeting}</p>
        <h1 className="hero-name">Ahmed Zamzam</h1>
        <div className="hero-typing"><span className="typing-text">{text}</span><span className="typing-cursor">|</span></div>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">{t.hero.viewWork}</a>
          <a href="#contact" className="btn btn-outline">{t.hero.contactMe}</a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/ahmedzamzam55" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/ahmed-zamzam-7b9475233/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://wa.me/966532971052" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          <a href="mailto:zahmd8920@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
      <div className="scroll-indicator"><i className="fas fa-chevron-down"></i></div>
    </section>
  );
}
