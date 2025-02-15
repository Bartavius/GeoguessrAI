// pages/openstreet.tsx
import dynamic from 'next/dynamic'
import { FC } from 'react'

const InteractiveMap = dynamic(() => import('../../components/InteractiveMap'), { ssr: false })
const StreetView = dynamic(() => import('../../components/StreetView'), { ssr: false })

const OpenStreetPage: FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>OpenStreetMap & Mapillary Embed</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Interactive Map</h2>
        <InteractiveMap center={[0, 0]} />
      </section>

      <section>
        <h2>Interactive Street View (Mapillary)</h2>
        <StreetView />
      </section>
    </div>
  )
}

export default OpenStreetPage
