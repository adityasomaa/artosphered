import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Drops from './Drops.jsx'
import Roadmap from './Roadmap.jsx'
import Team from './Team.jsx'
import Mint from './Mint.jsx'

export default function VoidApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="drops" element={<Drops />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="team" element={<Team />} />
        <Route path="mint" element={<Mint />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
