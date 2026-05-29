import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Lineup from './Lineup'
import Schedule from './Schedule'
import Tickets from './Tickets'
import Contact from './Contact'

export default function PulseApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="lineup" element={<Lineup />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
