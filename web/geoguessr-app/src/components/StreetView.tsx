// components/StreetView.tsx
import { useEffect, useRef, FC } from 'react'
import 'mapillary-js/dist/mapillary.min.css'
import { Viewer } from 'mapillary-js'

const StreetView: FC = () => {
  const viewerContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (viewerContainer.current) {
      // Replace with a valid Mapillary image key from your Mapillary account.
      const imageKey = 'YOUR_MAPILLARY_IMAGE_KEY'
      // Optionally, if required by your Mapillary setup, you can pass a client token:
      // const clientToken = 'YOUR_MAPILLARY_CLIENT_TOKEN'

      const viewer = new Viewer({
        container: viewerContainer.current,
        imageId: imageKey,
        // clientToken: clientToken, // Uncomment if using a client token
      })

      // Cleanup viewer when component unmounts
      return () => {
        viewer.remove()
      }
    }
  }, [])

  return <div ref={viewerContainer} style={{ height: '400px', width: '100%' }} />
}

export default StreetView
