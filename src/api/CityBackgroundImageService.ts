import axios from 'axios';
import {UNSPLASH_API_KEY, UNSPLASH_URL} from '@env';
/**
 * Fetches a city image from Unsplash API.
 * @param {string} city - The name of the city.
 * @returns {Promise<string>} - Image URL or an empty string if not found.
 */
export const fetchCityImage = async (city: string): Promise<string> => {
  if (!city) {
    console.warn('fetchCityImage: City name is empty.');
    return '';
  }

  try {
    console.log(`Fetching city image for: ${city} ${UNSPLASH_URL}`);

    const response = await axios.get(UNSPLASH_URL, {
      params: {query: city, client_id: UNSPLASH_API_KEY, per_page: 1},
    });
    console.log('🚀 ~ fetchCityImage ~ response:', response);

    if (response.data?.results?.length > 0) {
      return response.data.results[0].urls.regular;
    } else {
      console.warn(`fetchCityImage: No image found for ${city}.`);
      return ''; // Return empty string if no image is found
    }
  } catch (error: any) {
    console.error('fetchCityImage Error:', error.message);
    return ''; // Return empty string in case of failure
  }
};
