import { useState } from 'react';
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type Poi } from '@situm/sdk-js';

import FetchSitumPois from './FetchSitumPois';
import Pin from './Pin'
import PinInfo from './PinInfo'


function RenderMapWithPois() {
  const [selectedMarker, setSelectedMarker] = useState<Poi | null>(null);
  const [viewState, setViewState] = useState({ latitude: 43.35210002555383, longitude: -8.425047024336083, zoom: 18 });

  const situmPois = FetchSitumPois();

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
              setSelectedMarker(situmPoi);
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
            onClose={() => setSelectedMarker(null)}
          >
          </PinInfo>
        )}
      </Map>
    );
  }
}

export default RenderMapWithPois;
