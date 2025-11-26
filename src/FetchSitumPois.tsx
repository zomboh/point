import { useEffect, useState } from 'react'
import SitumSDK, { type Poi } from '@situm/sdk-js';

const sdk = new SitumSDK({
  auth: {
    // TODO: Move the key to an external file
    // ... and invalidate this one, since it's already been committed and compromised :)
    apiKey: "your_api_key_here",
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