import { useEffect, useRef } from 'react';
import SitumSDK, { ViewerEventType } from '@situm/sdk-js';

export default function MapViewer({ buildingId, apiKey }: { buildingId: number; apiKey: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const sdk = new SitumSDK({
      auth: {
        apiKey,
      },
      domain: "https://api.situm.com",
     });
    
     const viewer = sdk.viewer.create({
       domElement: ref.current,
       buildingId,
     });

    viewer.on(ViewerEventType.MAP_IS_READY, () => console.log('viewer ready'));
  }, [buildingId, apiKey]);

  return <div ref={ref} style={{ width: "100%", height: 560 }} />;
}