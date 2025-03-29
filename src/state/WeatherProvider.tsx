import React, {createContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';
import {fetchWeather, WeatherData} from '../api/WeatherService';
import {fetchCityImage} from '../api/CityBackgroundImageService';

interface WeatherContextType {
  weather: WeatherData | null;
  backgroundImage: string;
  city: string | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (city: string) => void;
  setCityData: (city: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined,
);

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>('');

  // 🌙 Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load stored city and theme
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('lastCity');
        const storedTheme = await AsyncStorage.getItem('theme');

        if (storedCity) {
          console.log(`Fetching weather for stored city: ${storedCity}`);
          fetchWeatherData(storedCity);
        }

        if (storedTheme) {
          setTheme(storedTheme as 'light' | 'dark'); // Apply stored theme
        } else {
          const systemTheme = Appearance.getColorScheme();
          setTheme(systemTheme === 'dark' ? 'dark' : 'light'); // Default to system preference
        }
      } catch (err) {
        console.error('Error loading stored data:', err);
      }
    };

    loadStoredData();
  }, []);

  const fetchWeatherData = useCallback(async (city: string) => {
    console.log(`Fetching weather data for: ${city}`);
    setLoading(true);
    setError(null);
    try {
      const [data, imageUrl] = await Promise.all([
        fetchWeather(city),
        fetchCityImage(city),
      ]);
      if (!data) throw new Error('Weather data is unavailable');
      setWeather(data);
      setBackgroundImage(imageUrl);
      await AsyncStorage.setItem('lastCity', city);
      console.log('Weather data updated successfully');
    } catch (err: any) {
      console.error('Error fetching weather data:', err.message);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const setCityData = (city: string) => {
    setCity(city);
  };

  // 🌗 Toggle Theme and Store in AsyncStorage
  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme); // Update state to apply changes immediately
    await AsyncStorage.setItem('theme', newTheme); // Store in AsyncStorage
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        backgroundImage,
        loading,
        error,
        fetchWeatherData,
        setCityData,
        city,
        theme,
        toggleTheme,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};
