import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import CultureReport from './CultureReport'
import Events from './Events'
import Services from './Services'
import Contact from './Contact'

export default function PulseApp() {
  return (
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
  )
}
