import { useEffect, useState } from 'react'
import SitumSDK, { type Poi } from '@situm/sdk-js';

const APIKEY = import.meta.env.VITE_SITUM_API_KEY;

const sdk = new SitumSDK({
  auth: {
    apiKey: APIKEY,
  },
  domain: "https://api.situm.com",
});

function FetchSitumPois() {
  const [fetchedPois, setFetchedPois] = useState<Poi[] | null>(null);
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const pois = await sdk.cartography.getPois({ buildingId: 7033 });
        setFetchedPois(pois);
      } catch (err) {
        console.log('Error');
      }
    };
    fetchData();
  }, []);
  return fetchedPois;
}

export default FetchSitumPois;