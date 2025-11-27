import './PinInfo.css'
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
      <div className="text-sm">
        <h3 className="text-md font-bold">
          {poi.name}
        </h3>
      </div>
    </Popup>
  )
}

export default PinInfo;