import { Popup } from '@vis.gl/react-maplibre';
import { type Poi } from '@situm/sdk-js';

interface props {
  poi: Poi;
  onClose: () => void;
}

function PinInfo({
  poi,
  onClose
}: props) {

  return (
    <Popup
      anchor="top"
      key={`popup-${poi.id}`}
      longitude={poi.location.lng}
      latitude={poi.location.lat}
      onClose={() => onClose()}
    >
      <div>
        {poi.name}
      </div>
    </Popup>
  )
}

export default PinInfo;