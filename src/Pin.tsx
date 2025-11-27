import { Marker } from '@vis.gl/react-maplibre';
import { type Poi } from '@situm/sdk-js';

interface props {
  poi: Poi;
  onClick: () => void;
}

function Pin({
  poi,
  onClick
}: props) {

  return (
    <Marker
      key={`marker-${poi.id}`}
      longitude={poi.location.lng}
      latitude={poi.location.lat}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick();
      }}
      style={{ cursor: 'pointer' }}
    >
    </Marker>
  )
}

export default Pin;