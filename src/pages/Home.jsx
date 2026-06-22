import { Link } from 'react-router-dom'
import useVisible from '../hooks/useVisible'

/* ---------- data ---------- */

const stats = [
  {
    value: '45M',
    label: 'Children Suffer from Acute Wasting',
    source: 'WHO Global Nutrition Report, 2023',
  },
  {
    value: '149M',
    label: 'Children Under 5 Are Stunted',
    source: 'UNICEF State of the World\'s Children, 2023',
  },
  {
    value: '45%',
    label: 'Of All Child Deaths Linked to Malnutrition',
    source: 'World Health Organization',
  },
]

const solutionCards = [
  {
    icon: '🦠',
    title: 'Safe Probiotic Chassis',
    desc: 'We use E. coli Nissle 1917 — a well-studied probiotic with decades of clinical use in humans, not a wild-type pathogen.',
  },
  {
    icon: '⚗️',
    title: 'Engineered Enzyme Secretion',
    desc: 'Our modified strain carries a synthetic gene circuit that produces and secretes a gut-restorative enzyme under intestinal conditions.',
  },
  {
    icon: '🌍',
    title: 'Low-Cost & Scalable',
    desc: 'Designed for resource-limited settings. Probiotic delivery is manufacturable at low cost without cold-chain logistics.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Malnutrition Disrupts the Gut',
    desc: 'Chronic malnutrition impairs the gut microbiome and suppresses signaling hormones like GLP-2, causing intestinal atrophy and poor nutrient absorption — locking children in a cycle of wasting and stunting.',
  },
  {
    num: '02',
    title: 'NourishGut Colonizes the Gut',
    desc: 'The engineered E. coli Nissle 1917 strain is administered as a daily probiotic. It colonizes the gut and senses the intestinal environment using a synthetic promoter circuit tied to the metabolic state of malnutrition.',
  },
  {
    num: '03',
    title: 'Enzyme Restores Gut Signaling',
    desc: 'The secreted enzyme targets the disrupted signaling pathway, stimulating intestinal repair and improving nutrient uptake — breaking the biological cycle with a biology-first solution.',
  },
]

const pillars = [
  {
    icon: '🎓',
    title: 'Youth Leadership',
    text: 'Middle and high school students take the lead in designing and running real synthetic biology research.',
  },
  {
    icon: '⚖️',
    title: 'Ethical Research',
    text: 'Every project is grounded in responsible, ethical approaches to biotechnology innovation.',
  },
  {
    icon: '📢',
    title: 'Entrepreneurship',
    text: 'Students build skills to pitch, communicate, and lead science-driven ventures.',
  },
  {
    icon: '🛡️',
    title: 'Safety First',
    text: 'Structured safety protocols keep hands-on lab work rigorous and responsible.',
  },
  {
    icon: '🔬',
    title: 'Synthetic Biology',
    text: 'Hands-on experience in biotechnology, computational biology, and science communication.',
  },
]

/* ---------- animation wrapper ---------- */

function Fade({ children, className = '', delay = '' }) {
  const [ref, visible] = useVisible()
  return (
    <div ref={ref} className={`fade-up${visible ? ' visible' : ''}${delay ? ` ${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ---------- component ---------- */

export default function Home() {
  return (
    <div className="home-v2">

      {/* ===== HERO ===== */}
      <section className="hv2-hero">
        <div className="hv2-hero-inner">
          <img
            className="hv2-hero-logo"
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/p5fjh2WAD7NRVmJd/chatgpt-image-apr-26-2026-10_02_12-am-7uzgocoyCqOWefKC.png"
            alt="Texas iGEM Collective logo"
          />
          <div className="hv2-hero-text">
            <p className="hv2-eyebrow">Texas iGEM Collective &middot; 2026 Project</p>
            <h1 className="hv2-title">NourishGut</h1>
            <p className="hv2-sub">
              Engineering a probiotic to fight childhood malnutrition from the inside out.
            </p>
            <div className="hv2-actions">
              <a href="#solution" className="btn-hero-primary">Our Solution</a>
              <Link to="/survey" className="btn-hero-outline">Take the Survey</Link>
            </div>
          </div>
        </div>
        <p className="hv2-scroll-hint">&#x2193; Scroll to learn more</p>
      </section>

      {/* ===== STATS ===== */}
      <section className="hv2-stats" id="problem">
        <div className="hv2-inner">
          <Fade>
            <p className="hv2-section-eyebrow light">The Scale of the Problem</p>
            <h2 className="hv2-section-title light">Malnutrition is a global crisis</h2>
            <p className="hv2-section-lead light">
              Despite decades of progress, malnutrition remains the leading cause of preventable childhood death worldwide. Current interventions — food aid, supplements, and fortification — address symptoms but rarely fix the underlying biology.
            </p>
          </Fade>
          <div className="hv2-stats-grid">
            {stats.map((s, i) => (
              <Fade key={s.value} delay={`d${i + 1}`}>
                <div className="hv2-stat-card">
                  <div className="hv2-stat-value">{s.value}</div>
                  <div className="hv2-stat-label">{s.label}</div>
                  <div className="hv2-stat-source">{s.source}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className="hv2-solution" id="solution">
        <div className="hv2-inner">
          <Fade>
            <p className="hv2-section-eyebrow">Our 2026 Project</p>
            <h2 className="hv2-section-title">Introducing NourishGut</h2>
            <p className="hv2-section-lead">
              We&apos;re engineering{' '}
              <em>E. coli</em> Nissle 1917 — a safe, well-characterised probiotic bacterium — to produce and secrete a gut-restorative enzyme, aiming to reverse the intestinal damage caused by chronic malnutrition. The science is mentored by researchers at UT MD Anderson and the University of Houston.
            </p>
          </Fade>
          <div className="hv2-solution-cards">
            {solutionCards.map((card, i) => (
              <Fade key={card.title} delay={`d${i + 1}`}>
                <div className="hv2-solution-card">
                  <div className="hv2-solution-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="hv2-howit">
        <div className="hv2-inner">
          <Fade>
            <p className="hv2-section-eyebrow light">The Science</p>
            <h2 className="hv2-section-title light">How NourishGut Works</h2>
          </Fade>
          <div className="hv2-steps">
            {steps.map((step, i) => (
              <Fade key={step.num} delay={`d${i + 1}`}>
                <div className="hv2-step">
                  <div className="hv2-step-num">{step.num}</div>
                  <div className="hv2-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <section className="hv2-pillars">
        <div className="hv2-inner">
          <Fade>
            <p className="hv2-section-eyebrow">Our Organization</p>
            <h2 className="hv2-section-title">What We Stand For</h2>
            <p className="hv2-section-lead">
              Texas iGEM Collective is the first community iGEM team in Texas &mdash; a registered 501(c)(3) nonprofit giving middle and high school students hands-on experience in synthetic biology, culminating in a trip to the iGEM Grand Jamboree.
            </p>
          </Fade>
          <div className="hv2-pillars-grid">
            {pillars.map((p, i) => (
              <Fade key={p.title} delay={`d${i + 1}`}>
                <div className="hv2-pillar-card">
                  <div className="hv2-pillar-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hv2-cta">
        <div className="hv2-inner hv2-cta-inner">
          <Fade>
            <h2>Help Us Understand the Problem</h2>
            <p>
              We&apos;re collecting data on awareness and impact of childhood malnutrition in Texas communities. Your 5-minute response directly informs our research and outreach strategy.
            </p>
            <Link to="/survey" className="btn-cta">Take the Survey</Link>
          </Fade>
        </div>
      </section>

    </div>
  )
}
