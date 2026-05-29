import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="ag-pagehead ag-container">
        <p className="ag-eyebrow" data-reveal>Start a project</p>
        <h1 data-reveal data-reveal-delay="80">Let’s make your<br />next site.</h1>
        <p className="ag-lead" data-reveal data-reveal-delay="160" style={{ marginTop: '1.4rem' }}>
          Tell us what you’re building. We reply within 48 hours with a concept and a quote.
        </p>
      </section>

      <section className="ag-container ag-section" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 'clamp(2rem,6vw,5rem)' }} className="ag-contact-grid">
          <div data-reveal>
            {sent ? (
              <div className="ag-sent">✦ Thanks — your brief is in. We’ll be in touch within 48 hours.</div>
            ) : (
              <form className="ag-form" onSubmit={onSubmit}>
                <div className="ag-row2">
                  <div className="ag-field">
                    <label htmlFor="name">Your name</label>
                    <input id="name" required placeholder="Jane Doe" />
                  </div>
                  <div className="ag-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required placeholder="jane@studio.com" />
                  </div>
                </div>
                <div className="ag-field">
                  <label htmlFor="type">Project type</label>
                  <select id="type" defaultValue="">
                    <option value="" disabled>Choose one…</option>
                    <option>Photography / Portfolio</option>
                    <option>Art Gallery</option>
                    <option>Music / Events</option>
                    <option>Fashion / E-commerce</option>
                    <option>Web3 / NFT</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="ag-field">
                  <label htmlFor="budget">Budget</label>
                  <select id="budget" defaultValue="">
                    <option value="" disabled>Choose one…</option>
                    <option>Under $2k</option>
                    <option>$2k – $5k</option>
                    <option>$5k – $12k</option>
                    <option>$12k+</option>
                  </select>
                </div>
                <div className="ag-field">
                  <label htmlFor="msg">Tell us about it</label>
                  <textarea id="msg" rows="5" placeholder="A few sentences about your brand and goals…" />
                </div>
                <button type="submit" className="ag-btn ag-btn-primary" style={{ justifyContent: 'center' }}>Send brief →</button>
              </form>
            )}
          </div>

          <aside data-reveal data-reveal-delay="120" style={{ display: 'grid', gap: '1.6rem', alignContent: 'start' }}>
            <div className="ag-feature">
              <div className="ag-feature-ico">✉</div>
              <h3 style={{ fontSize: '1.1rem' }}>Email</h3>
              <p><a href="mailto:hello@artosphered.com" style={{ color: 'var(--brand-2)' }}>hello@artosphered.com</a></p>
            </div>
            <div className="ag-feature">
              <div className="ag-feature-ico">◷</div>
              <h3 style={{ fontSize: '1.1rem' }}>Response time</h3>
              <p>Within 48 hours, every weekday.</p>
            </div>
            <div className="ag-feature">
              <div className="ag-feature-ico">⬡</div>
              <h3 style={{ fontSize: '1.1rem' }}>Based</h3>
              <p>Remote-first · working with clients worldwide.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
