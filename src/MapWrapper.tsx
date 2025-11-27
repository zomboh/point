import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type Poi } from '@situm/sdk-js';

import Pin from './Pin'
import PinInfo from './PinInfo'

interface viewState {
  latitude: number,
  longitude: number,
  zoom: number
}

interface props {
  onMove: (e: { viewState: viewState }) => void,
  onPinClick: (poi: Poi, e: { viewState: viewState }) => void;
  onPinInfoClose: () => void,
  selectedMarker: Poi | null,
  situmPois: Poi[] | null,
  viewState: viewState,
}

function MapWrapper({ onMove, onPinClick, onPinInfoClose, selectedMarker, situmPois, viewState }: props) {
  
  if (situmPois) {
    return (
      <Map
        {...viewState}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        onMove={onMove}
      >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {situmPois.map(situmPoi => (
          <Pin
            key={`pin-${situmPoi.id}`}
            poi={situmPoi}
            onClick={() => {
              onPinClick(situmPoi, { 
                viewState: { 
                  latitude: situmPoi.location.lat, 
                  longitude: situmPoi.location.lng, 
                  zoom: viewState.zoom 
                } 
              });
            }}
          >
          </Pin>
        ))}
        {selectedMarker && (
          <PinInfo
            key={`pinInfo-${selectedMarker.id}`}
            poi={selectedMarker}
            onClose={onPinInfoClose}
          >
          </PinInfo>
        )}
      </Map>
    );
  }
}

export default MapWrapper;
