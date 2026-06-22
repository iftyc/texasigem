const members = [
  {
    name: 'Jane Doe',
    role: 'Team Lead',
    bio: 'Placeholder bio. Jane is a high school student passionate about synthetic biology and research.',
    photo: 'https://placehold.co/200x200?text=Jane',
  },
  {
    name: 'John Smith',
    role: 'Lab Researcher',
    bio: 'Placeholder bio. John focuses on wet-lab experiments and protocol design.',
    photo: 'https://placehold.co/200x200?text=John',
  },
  {
    name: 'Alex Lee',
    role: 'Outreach Coordinator',
    bio: 'Placeholder bio. Alex leads community outreach and science communication efforts.',
    photo: 'https://placehold.co/200x200?text=Alex',
  },
]

export default function AboutUs() {
  return (
    <section className="page">
      <h1>About Us</h1>
      <p style={{ color: '#475569', lineHeight: 1.75, marginTop: '0.5rem' }}>
        Texas iGEM Collective is the first community iGEM team in Texas &mdash; a registered
        501(c)(3) nonprofit. We bring together middle and high school students for hands-on
        experience in biotechnology, computational biology, entrepreneurship, and science
        communication, culminating in a trip to the international iGEM Grand Jamboree.
        Our 2026 project, <strong>NourishGut</strong>, targets childhood malnutrition using
        engineered probiotics.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '0.25rem', fontSize: '1.2rem', fontWeight: 700, color: '#0d1b2a' }}>
        Our Team
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 0 }}>
        Placeholder team members below &mdash; replace with real profiles.
      </p>

      <div className="members-grid">
        {members.map((member) => (
          <div className="member-card" key={member.name}>
            <img className="member-photo" src={member.photo} alt={member.name} />
            <h3>{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <p className="member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
