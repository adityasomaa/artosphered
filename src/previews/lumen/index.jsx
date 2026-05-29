import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Portfolio from './Portfolio'
import About from './About'
import Services from './Services'
import Contact from './Contact'

export default function LumenApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
