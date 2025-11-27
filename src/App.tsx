import './App.css'
import { useState } from 'react';
import MapWrapper from './MapWrapper'
import { type Poi } from '@situm/sdk-js';

import FetchSitumPois from './FetchSitumPois';

function App() {
  const [selectedMarker, setSelectedMarker] = useState<Poi | null>(null);
  const situmPois = FetchSitumPois();

  if (situmPois) {
    return (
      <>
        <MapWrapper situmPois={situmPois} onPinClick={(poi) => setSelectedMarker(poi)} selectedMarker={selectedMarker} onPinInfoClose={() => setSelectedMarker(null)} />
      </>
    )
  }
}

export default App
