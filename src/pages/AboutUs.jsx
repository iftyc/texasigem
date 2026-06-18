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

function AboutUs() {
  return (
    <section className="page">
      <h1>About Us</h1>
      <p>This is placeholder content for the About Us tab. Tell your story here.</p>

      <h2>Our Team</h2>
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

export default AboutUs
