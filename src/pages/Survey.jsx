function Survey() {
  return (
    <section className="page">
      <h1>Survey</h1>
      <p>Please fill out the survey below.</p>
      <div className="survey-embed">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfbg4h1vtrpZi7Mz79KRAu-bpcerFOj6_anbYd7SFVgFUxneA/viewform?embedded=true"
          title="Survey form"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </section>
  )
}

export default Survey
