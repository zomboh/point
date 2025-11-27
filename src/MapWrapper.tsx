import { useState } from 'react';
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

interface props {
  onPinClick: (poi: Poi) => void,
  onPinInfoClose: () => void,
  selectedMarker: Poi | null,
  situmPois: Poi[] | null
}

function MapWrapper({ onPinClick, onPinInfoClose, selectedMarker, situmPois }: props) {
  const [viewState, setViewState] = useState({ latitude: 43.35210002555383, longitude: -8.425047024336083, zoom: 18 });
  if (situmPois) {

    return (
      <Map
        {...viewState}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        onMove={e => setViewState(e.viewState)}
      >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {situmPois.map(situmPoi => (
          <Pin
            key={`pin-${situmPoi.id}`}
            poi={situmPoi}
            onClick={() => {
              onPinClick(situmPoi);
              setViewState({ latitude: situmPoi.location.lat, longitude: situmPoi.location.lng, zoom: viewState.zoom })
            }}
          >
          </Pin>
        ))
        }
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
