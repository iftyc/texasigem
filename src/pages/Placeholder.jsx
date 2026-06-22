export default function Placeholder({ section, title }) {
  return (
    <section className="page placeholder-page">
      <p className="placeholder-section">{section}</p>
      <h1>{title}</h1>
      <p className="placeholder-body">
        This page is under construction. Content will be added as the 2026 project progresses.
      </p>
      <div className="placeholder-badge">Coming Soon</div>
    </section>
  )
}
