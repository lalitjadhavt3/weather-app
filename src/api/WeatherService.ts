import axios from "axios";
import { TOMORROW_IO_API_KEY, WEATHERBIT_API_KEY, TOMORROW_IO_API_URL, WEATHERBIT_API_URL } from "@env";

const UNITS = "M"; // Metric system for Weatherbit
const TIMESTEPS = "1d"; // Daily forecast

export interface WeatherData {
  timelines: {
    daily: Array<{
      time: string;
      values: {
        temperatureAvg: number;
        temperatureMin: number;
        temperatureMax: number;
        windSpeedAvg: number;
        windDirectionAvg: number;
        humidityAvg: number;
        visibility: number;
        sunriseTime: string;
        sunsetTime: string;
        moonriseTime: string;
        moonsetTime: string;
        weatherCode: number;
      };
    }>;
  };
}

// Fetch Weather from Tomorrow.io
const fetchFromTomorrowIO = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(TOMORROW_IO_API_URL, {
    params: {
      location: city,
      apikey: TOMORROW_IO_API_KEY,
      units: "metric",
      timesteps: TIMESTEPS,
    },
    headers: { accept: "application/json" },
  });

  return response.data;
};

// Fetch Weather from Weatherbit (Backup API)
const fetchFromWeatherbit = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(WEATHERBIT_API_URL, {
    params: {
      city: city,
      key: WEATHERBIT_API_KEY,
      units: UNITS,
    },
    headers: { accept: "application/json" },
  });

  // Convert Weatherbit response to match Tomorrow.io structure
  return {
    timelines: {
      daily: response.data.data.map((day: any) => ({
        time: day.datetime,
        values: {
          temperatureAvg: (day.max_temp + day.min_temp) / 2,
          temperatureMin: day.min_temp,
          temperatureMax: day.max_temp,
          windSpeedAvg: day.wind_spd,
          windDirectionAvg: day.wind_dir,
          humidityAvg: day.rh,
          visibility: day.vis,
          sunriseTime: day.sunrise_ts,
          sunsetTime: day.sunset_ts,
          moonriseTime: day.moonrise_ts,
          moonsetTime: day.moonset_ts,
          weatherCode: day.weather.code,
        },
      })),
    },
  };
};

// Main function: Tries Tomorrow.io first, then falls back to Weatherbit
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    return await fetchFromTomorrowIO(city);
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn("Tomorrow.io rate limit exceeded. Switching to Weatherbit...");
      return await fetchFromWeatherbit(city);
    } else {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather data.");
    }
  }
};
