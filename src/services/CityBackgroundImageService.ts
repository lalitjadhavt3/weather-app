import axios from 'axios';

const UNSPLASH_API_KEY = 'fFB1Oksp4aQ7aIs7yqJvyAfdmoG1yPBaVqkEHFsPk8s';
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

export const fetchCityImage = async (city: string): Promise<string> => {
  try {
    const response = await axios.get(UNSPLASH_URL, {
      params: { query: city, client_id: UNSPLASH_API_KEY, per_page: 1 },
    });
    return response.data.results[0]?.urls.regular || '';
  } catch {
    return ''; // Return empty string if no image is found
  }
};
