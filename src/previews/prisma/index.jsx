import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import CultureReport from './CultureReport.jsx'
import Events from './Events.jsx'
import Services from './Services.jsx'
import Contact from './Contact.jsx'
import Loader from './Loader.jsx'

export default function PrismaApp() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* First-load PRISM loader — shown once, then fades */}
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="culture-report" element={<CultureReport />} />
          <Route path="events" element={<Events />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}
