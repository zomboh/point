import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type Poi, type Floor } from '@situm/sdk-js';
import Pin from './Pin';
import PinInfo from './PinInfo';

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface SitumData {
  pois: Poi[] | null;
  floors: readonly Floor[] | null;
  loading: boolean;
  error: Error | null;
}

interface MapWrapperProps {
  onMove: (e: { viewState: ViewState }) => void;
  onPinClick: (poi: Poi, e: { viewState: ViewState }) => void;
  onPinInfoClose: () => void;
  selectedMarker: Poi | null;
  situmData: SitumData;
  viewState: ViewState;
  selectedFloorId: number | null;
}

function MapWrapper({ 
  onMove, 
  onPinClick, 
  onPinInfoClose, 
  selectedMarker, 
  situmData, 
  viewState,
  selectedFloorId
}: MapWrapperProps) {
  const { pois, loading, error } = situmData;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%' 
      }}>
        Loading map data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
        color: 'red'
      }}>
        Error loading map data: {error.message}
      </div>
    );
  }

  if (!pois || pois.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%' 
      }}>
        No POIs available
      </div>
    );
  }

  const filteredPois = selectedFloorId 
    ? pois.filter(poi => poi.floorId === selectedFloorId)
    : pois;

  return (
    <Map
      {...viewState}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      onMove={onMove}
    >
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />
      <ScaleControl />

      {filteredPois.map(poi => (
        <Pin
          key={`pin-${poi.id}`}
          poi={poi}
          onClick={() => {
            onPinClick(poi, { 
              viewState: { 
                latitude: poi.location.lat, 
                longitude: poi.location.lng, 
                zoom: viewState.zoom 
              } 
            });
          }}
          selectedMarker={selectedMarker}
        />
      ))}

      {selectedMarker && selectedMarker.floorId === selectedFloorId && (
        <PinInfo
          key={`pinInfo-${selectedMarker.id}`}
          poi={selectedMarker}
          onClose={onPinInfoClose}
        />
      )}
    </Map>
  );
}

export default MapWrapper;