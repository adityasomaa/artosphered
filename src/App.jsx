import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './shared/SmoothScroll'
import IntroLoader from './shared/IntroLoader'

// Agency shell (the proposal site clients land on first)
import AgencyLayout from './agency/AgencyLayout'
import Home from './agency/Home'
import Work from './agency/Work'
import Services from './agency/Services'
import Process from './agency/Process'
import Contact from './agency/Contact'

// 5 demo sites — code-split so each preview ships its own bundle
const LumenApp = lazy(() => import('./previews/lumen/index.jsx'))
const PrismaApp = lazy(() => import('./previews/prisma/index.jsx'))
const PulseApp = lazy(() => import('./previews/pulse/index.jsx'))
const AtelierApp = lazy(() => import('./previews/atelier/index.jsx'))
const VoidApp = lazy(() => import('./previews/void/index.jsx'))

function Loader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#08080c',
        color: '#74748a',
        fontFamily: 'Space Grotesk, system-ui, sans-serif',
        letterSpacing: '0.3em',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
      }}
    >
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <>
      <IntroLoader />
      <SmoothScroll />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ---------- ARTOSPHERED agency shell ---------- */}
          <Route element={<AgencyLayout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="services" element={<Services />} />
            <Route path="process" element={<Process />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* ---------- Demo sites (each self-routes) ---------- */}
          <Route path="/p/lumen/*" element={<LumenApp />} />
          <Route path="/p/prisma/*" element={<PrismaApp />} />
          <Route path="/p/pulse/*" element={<PulseApp />} />
          <Route path="/p/atelier/*" element={<AtelierApp />} />
          <Route path="/p/void/*" element={<VoidApp />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}
