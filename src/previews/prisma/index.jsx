import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Exhibitions from './Exhibitions.jsx'
import Artists from './Artists.jsx'
import Visit from './Visit.jsx'
import Contact from './Contact.jsx'

export default function PrismaApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="exhibitions" element={<Exhibitions />} />
        <Route path="artists" element={<Artists />} />
        <Route path="visit" element={<Visit />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
