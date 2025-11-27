import { type Poi } from '@situm/sdk-js';
import './PoiList.css'

interface viewState {
  latitude: number,
  longitude: number,
  zoom: number
}

interface props {
  onPoiClick: (poi: Poi, e: { viewState: viewState }) => void;
  selectedMarker: Poi | null,
  situmPois: Poi[] | null,
  viewState: viewState,
}

function PoiList({ onPoiClick, selectedMarker, situmPois, viewState }: props) {

  if (situmPois) {
    return (
      <div className="poi-list">
        <ul className="list bg-base-100 rounded-box shadow-md">
          {situmPois.map(situmPoi => (
            <a
              href="#"
              className={situmPoi.id === selectedMarker?.id ? "poi-list-link active" : "poi-list-link"}
              key={`poi-${situmPoi.id}`}
              onClick={(e) => {
                e.preventDefault;
                onPoiClick(situmPoi, {
                  viewState: {
                    latitude: situmPoi.location.lat,
                    longitude: situmPoi.location.lng,
                    zoom: viewState.zoom
                  }
                });
              }}
            >
              <li className="list-row">
                {situmPoi.icon ? (
                  // Sorry about the hotlinking :)
                  <div>
                    <img className="poi-list-icon" src={`https://dashboard.situm.com${situmPoi.icon}`} />
                  </div>
                ) :
                  <div>
                    <svg
                      className="poi-list-icon"
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
                  </div>
                }
                <div>
                  {situmPoi.name ? (
                    <div className="font-bold text-base">
                      {situmPoi.name}
                    </div>
                  ) :
                    <div>
                      Unnamed POI
                    </div>
                  }
                  {situmPoi.categoryName ? (
                    <div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {situmPoi.categoryName}
                      </div>
                    </div>
                  ) : null
                  }
                </div>
              </li>
            </a>
          ))}
        </ul>
      </div>
    )
  }
}

export default PoiList;