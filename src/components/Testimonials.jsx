import { useApp } from '../hooks/useApp';

export default function Testimonials() {
  const { t } = useApp();
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">{t.testimonials.title}</h2>
        <div className="testimonials-grid">
          {t.testimonials.list.map((item, i) => (
            <div className="testimonial-card animate-on-scroll" key={i}>
              <div className="stars">
                {Array.from({ length: Math.floor(item.stars) }, (_, j) => <i className="fas fa-star" key={j}></i>)}
                {item.stars % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              </div>
              <p>"{item.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar"><i className="fas fa-user-tie"></i></div>
                <div><strong>{item.name}</strong><span>{item.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
