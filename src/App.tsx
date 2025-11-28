import './App.css'
import { useState } from 'react';
import MapWrapper from './MapWrapper'
import PoiList from './PoiList'
import { type Poi } from '@situm/sdk-js';
import getSitumData from './getSitumData';

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

function App() {
  const [selectedMarker, setSelectedMarker] = useState<Poi | null>(null);
  const [viewState, setViewState] = useState<ViewState>({ 
    latitude: 43.35210002555383, 
    longitude: -8.425047024336083, 
    zoom: 18 
  });
  
  const situmData = getSitumData(7033);

  const handleMove = (e: { viewState: ViewState }) => {
    setViewState(e.viewState);
  };

  const handlePoiClick = (poi: Poi, e: { viewState: ViewState }) => {
    setSelectedMarker(poi);
    setViewState(e.viewState);
  };

  const handlePinInfoClose = () => {
    setSelectedMarker(null);
  };

  return (
    <>
      <MapWrapper
        onMove={handleMove}
        onPinClick={handlePoiClick}
        onPinInfoClose={handlePinInfoClose}
        selectedMarker={selectedMarker}
        situmData={situmData}
        viewState={viewState}
      />
      <PoiList
        onPoiClick={handlePoiClick}
        selectedMarker={selectedMarker}
        situmData={situmData}
        viewState={viewState}
      />
    </>
  );
}

export default App;