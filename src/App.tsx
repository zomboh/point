import './App.css'
import { useState } from 'react';
import MapWrapper from './MapWrapper'
import PoiList from './PoiList'
import { type Poi } from '@situm/sdk-js';

import FetchSitumPois from './FetchSitumPois';

function App() {
  const [selectedMarker, setSelectedMarker] = useState<Poi | null>(null);
  const [viewState, setViewState] = useState({ latitude: 43.35210002555383, longitude: -8.425047024336083, zoom: 18 });
  const situmPois = FetchSitumPois();

  if (situmPois) {
    return (
      <>
        <MapWrapper
          onMove={(e) => setViewState(e.viewState)}
          onPinClick={(poi: Poi, e: { viewState: typeof viewState }) => {
            setSelectedMarker(poi);
            setViewState(e.viewState);
          }}
          onPinInfoClose={() => setSelectedMarker(null)}
          selectedMarker={selectedMarker}
          situmPois={situmPois}
          viewState={viewState}
        />
        <PoiList
          onPoiClick={(poi: Poi, e: { viewState: typeof viewState }) => {
            setSelectedMarker(poi);
            setViewState(e.viewState);
          }}
          selectedMarker={selectedMarker}
          situmPois={situmPois}
          viewState={viewState}
        />
      </>
    )
  }
}

export default App;
