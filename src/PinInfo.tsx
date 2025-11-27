import './PinInfo.css'
import { Popup } from '@vis.gl/react-maplibre';
import { type Poi } from '@situm/sdk-js';
import DOMPurify from 'dompurify';

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
      {poi.name ? (
        <h3 className="font-bold text-center text-lg">
          {poi.name}
        </h3>
      ) : null}
      {poi.info ? (
        // I know you sanitize your inputs, but just in case... :)
        <div className="text-base situm-info" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(poi.info) }}>
        </div>
      ) : null}
    </Popup>
  )
}

export default PinInfo;