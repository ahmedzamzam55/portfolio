import { useApp } from '../hooks/useApp';

export default function Pricing() {
  const { t } = useApp();
  const plans = t.pricing.plans;

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">{t.pricing.title}</h2>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div className={`price-card animate-on-scroll${i === 1 ? ' featured' : ''}`} key={i}>
              {i === 1 && <div className="popular-tag">{t.pricing.popular}</div>}
              <div className="price-badge">{plan.badge}</div>
              {plan.desc && <p className="pricing-plan-desc">{plan.desc}</p>}
              <div className="price-amount">
                {plan.customPrice ? (
                  <span className="amount custom-text">{plan.amount}</span>
                ) : (
                  <>
                    <span className="currency">SAR</span>
                    <span className="amount">{plan.amount}</span>
                    {plan.plus && <span className="plus">+</span>}
                  </>
                )}
              </div>
              <p className="price-desc" style={plan.customPrice ? { opacity: 0 } : {}}>{t.pricing.startFrom}</p>
              <ul className="price-features">
                {plan.features.map((f, j) => (
                  <li key={j}><i className={`fas ${j === plan.features.length - 1 ? 'fa-clock' : 'fa-check'}`}></i> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${i === 1 ? 'btn-primary' : 'btn-outline'}`}>{t.pricing.getStarted}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
