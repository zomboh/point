import { useState } from 'react';
import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from '@vis.gl/react-maplibre';
import FetchSitumPois from './FetchSitumPois';
import 'maplibre-gl/dist/maplibre-gl.css';
import { type Poi } from '@situm/sdk-js';

function RenderPois() {
  const markers = FetchSitumPois();
  const [selectedMarker, setSelectedMarker] = useState<Poi | null>(null);

  if (markers) {
    return (
      <>
      { markers.map( poi => (
        <Marker
          key={`marker-${poi.id}`}
          longitude={poi.location.lng}
          latitude={poi.location.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedMarker(poi);
          }}
          style={{ cursor: 'pointer' }}
        >
          </Marker>
        ))
      }
      {selectedMarker && (
        <Popup
        anchor="top"
        key={`popup-${selectedMarker.id}`}
        longitude={selectedMarker.location.lng}
        latitude={selectedMarker.location.lat}
        onClose={() => setSelectedMarker(null)}
      >
        <div className="tooltip">
          {selectedMarker.name}
        </div>
      </Popup>
      )}
      </>
    );
  }

  return null;
}

function RenderMap() {
    return(
      <Map
        initialViewState={{
          latitude: 43.35210002555383,
          longitude: -8.425047024336083,
          zoom: 18
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        <RenderPois />
      </Map>
    );
}

function RenderMapWithPois() {

  return (
    <RenderMap>
    </RenderMap>
  );
}

export default RenderMapWithPois;
