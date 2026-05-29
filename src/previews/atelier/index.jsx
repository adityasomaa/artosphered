import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Collections from './Collections'
import Lookbook from './Lookbook'
import About from './About'
import Contact from './Contact'

export default function AtelierApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="lookbook" element={<Lookbook />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
