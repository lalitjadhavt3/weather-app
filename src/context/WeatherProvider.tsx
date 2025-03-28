import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeather, WeatherData } from '../services/WeatherService';
import { fetchCityImage } from '../services/CityBackgroundImageService';
interface WeatherContextType {
  weather: WeatherData | null;
  backgroundImage: string;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (city: string) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredCity = async () => {
      const storedCity = await AsyncStorage.getItem('lastCity');
      if (storedCity) {
        fetchWeatherData(storedCity);
      }
    };
    loadStoredCity();
  }, []);

  const fetchWeatherData = async (city: string) => {
   
    setLoading(true);
    setError(null);
    try {
        
      const data = await fetchWeather(city);
     

      const imageUrl = await fetchCityImage(city);
      setWeather(data);
      setBackgroundImage(imageUrl);
      await AsyncStorage.setItem('lastCity', city);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, backgroundImage, loading, error, fetchWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
