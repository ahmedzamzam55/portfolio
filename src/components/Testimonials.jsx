import { useApp } from '../hooks/useApp';

const avatarGradients = [
  'linear-gradient(135deg, #6c63ff, #00d4ff)',
  'linear-gradient(135deg, #ff6b6b, #ffd700)',
  'linear-gradient(135deg, #00e676, #00d4ff)',
];

function getInitials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function Testimonials() {
  const { t } = useApp();
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">{t.testimonials.title}</h2>
        <div className="testimonials-grid">
          {t.testimonials.list.map((item, i) => (
            <div className="testimonial-card animate-on-scroll" key={i}>
              <span className="testimonial-quote">"</span>
              <div className="stars">
                {Array.from({ length: Math.floor(item.stars) }, (_, j) => <i className="fas fa-star" key={j}></i>)}
                {item.stars % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              </div>
              <p>"{item.text}"</p>
              <div className="testimonial-author">
                <div 
                  className="author-avatar"
                  style={{ background: avatarGradients[i % avatarGradients.length] }}
                >
                  {getInitials(item.name)}
                </div>
                <div><strong>{item.name}</strong><span>{item.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
