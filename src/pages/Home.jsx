const pillars = [
  {
    title: 'Youth Leadership',
    text: 'Middle and high school students take the lead in designing and running real synthetic biology research.',
  },
  {
    title: 'Ethical Research & Innovation',
    text: 'Every project is grounded in responsible, ethical approaches to biotechnology innovation.',
  },
  {
    title: 'Leadership & Entrepreneurship',
    text: 'Students build the skills to pitch, communicate, and lead science-driven ventures.',
  },
  {
    title: 'Safety & Ethical Science',
    text: 'Structured safety protocols keep hands-on lab work rigorous and responsible.',
  },
  {
    title: 'Research & Synthetic Biology',
    text: 'Hands-on experience in biotechnology, computational biology, and science communication.',
  },
]

function Home() {
  return (
    <div className="home">
      <section className="hero page">
        <img
          className="hero-logo"
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/p5fjh2WAD7NRVmJd/chatgpt-image-apr-26-2026-10_02_12-am-7uzgocoyCqOWefKC.png"
          alt="Texas iGEM Collective logo"
        />
        <div className="hero-text">
          <h1>Texas iGEM Collective</h1>
          <p className="tagline">Empowering the Next Generation of Biotech Innovators</p>
          <p>
            Texas iGEM Collective is the first community iGEM team in Texas — a registered
            501(c)(3) nonprofit giving middle and high school students hands-on experience in
            biotechnology, computational biology, entrepreneurship, and science communication,
            culminating in a trip to the international iGEM Grand Jamboree.
          </p>
        </div>
      </section>

      <section className="page pillars-section">
        <h2>What We Stand For</h2>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div className="pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page project-section">
        <h2>Our 2026 Project: NourishGut</h2>
        <p>
          Our 2026 project — working title <strong>&quot;NourishGut&quot;</strong> — tackles
          childhood malnutrition (stunting and wasting). We&apos;re engineering a well-studied,
          safe probiotic bacterium (<em>E. coli</em> Nissle 1917) to produce and secrete a
          beneficial enzyme in the gut, aiming to restore healthy gut signaling that gets
          disrupted in undernourished children. The goal is a low-cost, scalable approach that
          could work in resource-limited settings. The science is mentored by researchers at UT
          MD Anderson and the University of Houston.
        </p>
      </section>
    </div>
  )
}

export default Home
