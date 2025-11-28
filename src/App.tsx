import './App.css'
import { useState, useEffect } from 'react';
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
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  
  const situmData = getSitumData(7033);

  // Set default floor (level "0") when floors are loaded
  useEffect(() => {
    if (situmData.floors && !selectedFloorId) {
      const defaultFloor = situmData.floors.find(floor => floor.level === 0);
      if (defaultFloor) {
        setSelectedFloorId(defaultFloor.id);
      } else if (situmData.floors.length > 0) {
        // If no floor with level "0", select the first floor
        setSelectedFloorId(situmData.floors[0].id);
      }
    }
  }, [situmData.floors, selectedFloorId]);

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

  const handleFloorChange = (floorId: number) => {
    setSelectedFloorId(floorId);
    setSelectedMarker(null); // Clear selected marker when changing floors
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
        selectedFloorId={selectedFloorId}
      />
      <PoiList
        onPoiClick={handlePoiClick}
        selectedMarker={selectedMarker}
        situmData={situmData}
        viewState={viewState}
        selectedFloorId={selectedFloorId}
        onFloorChange={handleFloorChange}
      />
    </>
  );
}

export default App;