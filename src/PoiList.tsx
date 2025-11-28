import { type Poi, type Floor } from '@situm/sdk-js';
import './PoiList.css';
import { useEffect, useRef, useState } from 'react';
import logoImage from './assets/logo.svg';

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface SitumData {
  pois: Poi[] | null;
  floors: readonly Floor[] | null;
  loading: boolean;
  error: Error | null;
}

interface PoiListProps {
  onPoiClick: (poi: Poi, e: { viewState: ViewState }) => void;
  selectedMarker: Poi | null;
  situmData: SitumData;
  viewState: ViewState;
  selectedFloorId: number | null;
  onFloorChange: (floorId: number) => void;
}

function PoiList({ 
  onPoiClick, 
  selectedMarker, 
  situmData, 
  viewState,
  selectedFloorId,
  onFloorChange
}: PoiListProps) {
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { pois, floors, loading, error } = situmData;

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [selectedMarker]);

  if (loading) {
    return (
      <div className="poi-list-wrapper">
        <header className="logo">
          <img src={logoImage} alt="POInt" />
        </header>
        <div className="poi-list">
          <div className="flex justify-center items-center p-4">
            Loading POIs...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="poi-list-wrapper">
        <header className="logo">
          <img src={logoImage} alt="POInt" />
        </header>
        <div className="poi-list">
          <div className="flex justify-center items-center p-4 text-red-500">
            Error: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!pois || pois.length === 0 || !floors || floors.length === 0) {
    return (
      <div className="poi-list-wrapper">
        <header className="logo">
          <img src={logoImage} alt="POInt" />
        </header>
        <div className="poi-list">
          <div className="flex justify-center items-center p-4">
            No POIs available
          </div>
        </div>
      </div>
    );
  }

  const floorFilteredPois = selectedFloorId !== null
    ? pois.filter(poi => poi.floorId === selectedFloorId)
    : pois;

  const filteredPois = searchQuery.trim() === ''
    ? floorFilteredPois
    : floorFilteredPois.filter(poi => {
        const searchLower = searchQuery.toLowerCase();
        const nameMatch = poi.name?.toLowerCase().includes(searchLower);
        const categoryMatch = poi.categoryName?.toLowerCase().includes(searchLower);
        return nameMatch || categoryMatch;
      });

  const sortedFloors = [...floors].sort((a, b) => {
    const levelA = a.level || 0;
    const levelB = b.level || 0;
    return levelA - levelB;
  });

  return (
    <div className="poi-list-wrapper">
      <header className="logo">
        <img src={logoImage} alt="POInt" />
      </header>
      
      <div className="floor-selector p-4 bg-white border-b border-t border-t-solid border-t-[1px] border-b-[1px] border-neutral-300">
        <div className="text-xs font-semibold text-gray-600 mb-2">SELECT FLOOR</div>
        <div className="flex flex-wrap gap-2">
          {sortedFloors.map(floor => (
            <button
              key={`floor-${floor.id}`}
              onClick={() => onFloorChange(floor.id)}
              className={`btn btn-md btn-soft btn-primary ${
                selectedFloorId === floor.id
                  ? 'btn-active'
                  : ''
              }`}
            >
              {floor.level === 0 ? "Ground Floor" : `${floor.level}`}
            </button>
          ))}
        </div>
      </div>

      <div className="search-bar p-4 bg-white border-b border-b-solid border-b-[1px] border-neutral-300">
        <div className="relative">
          <input
            type="text"
            placeholder="Search POIs by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="text-xs text-gray-500 mt-2">
            Found {filteredPois.length} result{filteredPois.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="poi-list">
        {filteredPois.length === 0 ? (
          <div className="flex justify-center items-center p-4 bg-white">
            {searchQuery ? 'No POIs match your search' : 'No POIs on this floor'}
          </div>
        ) : (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {filteredPois.map(poi => (
              <a
                className={poi.id === selectedMarker?.id ? "poi-list-link active" : "poi-list-link"}
                href="#"
                key={`poi-${poi.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onPoiClick(poi, {
                    viewState: {
                      latitude: poi.location.lat,
                      longitude: poi.location.lng,
                      zoom: viewState.zoom
                    }
                  });
                }}
                ref={poi.id === selectedMarker?.id ? activeItemRef : null}
              >
                <li className="list-row bg-neutral-50">
                  {poi.icon ? (
                    <div>
                      <img 
                        className="poi-list-icon" 
                        src={`https://dashboard.situm.com${poi.icon}`}
                        alt={poi.name || 'POI icon'}
                      />
                    </div>
                  ) : (
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
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    {poi.name ? (
                      <div className="font-bold text-base">
                        {poi.name}
                      </div>
                    ) : (
                      <div>
                        Unnamed POI
                      </div>
                    )}
                    {poi.categoryName && (
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {poi.categoryName}
                      </div>
                    )}
                  </div>
                </li>
              </a>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PoiList;