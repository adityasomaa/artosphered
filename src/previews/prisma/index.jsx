import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import CultureReport from './CultureReport.jsx'
import Events from './Events.jsx'
import Services from './Services.jsx'
import Contact from './Contact.jsx'
import Loader from './Loader.jsx'

export default function PrismaApp() {
  return (
    <>
      {/* Loader rendered at top level — outside Routes so it covers everything */}
      <Loader />

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
