import { useEffect, useState } from 'react'
import SitumSDK, { type Poi, type Floor } from '@situm/sdk-js';

const APIKEY = import.meta.env.VITE_SITUM_API_KEY;
const sdk = new SitumSDK({
  auth: {
    apiKey: APIKEY,
  },
  domain: "https://api.situm.com",
});

interface SitumData {
  pois: Poi[] | null;
  floors: readonly Floor[] | null;
  loading: boolean;
  error: Error | null;
}

function getSitumData(buildingId: number): SitumData {
  const [fetchedPois, setFetchedPois] = useState<Poi[] | null>(null);
  const [fetchedFloors, setFetchedFloors] = useState<readonly Floor[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [pois, floors] = await Promise.all([
          sdk.cartography.getPois({ buildingId }),
          sdk.cartography.getFloors({ buildingId })
        ]);

        if (isMounted) {
          setFetchedPois(pois);
          setFetchedFloors(floors);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'));
          console.error('Error fetching Situm data:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [buildingId]);

  return { 
    pois: fetchedPois, 
    floors: fetchedFloors, 
    loading, 
    error 
  };
}

export default getSitumData;