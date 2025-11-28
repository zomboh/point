import { Marker } from '@vis.gl/react-maplibre';
import { type Poi } from '@situm/sdk-js';
import './Pin.css';

interface PinProps {
  onClick: () => void,
  poi: Poi,
  selectedMarker: Poi | null
}

function Pin({ onClick, poi, selectedMarker }: PinProps) {
  const isSelected = selectedMarker?.id === poi.id;
  const shouldFade = selectedMarker !== null && !isSelected;

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
      style={{
        cursor: 'pointer',
        zIndex: isSelected ? 1000 : 0,
      }}
    >
      <article
        className={`flex flex-col items-center situm-pin ${isSelected ? 'is-selected' : ''}`}
        style={{
          opacity: shouldFade ? 0.3 : 1, 
          transition: 'opacity 0.3s ease-in-out, transform 50ms ease-in-out'
        }}
      >
        {poi.icon ? (
          <img
            className="situm-icon"
            src={`https://dashboard.situm.com${poi.icon}`}
            alt={poi.name || 'POI icon'}
          />
        ) : (
          <svg
            className="poi-icon"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
        )}
        {poi.name && (
          <header className="text-sm text-neutral-600">
            {poi.name}
          </header>
        )}
      </article>
    </Marker>
  );
}

export default Pin;