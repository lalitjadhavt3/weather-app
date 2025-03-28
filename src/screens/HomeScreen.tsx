import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useColorScheme,
} from "react-native";
import WeatherCard from "../components/WeatherCard";
import WeatherInfoCard from "../components/WeatherInfoCard";
import { WeatherContext } from "../context/WeatherProvider";
import SearchBar from "../components/SearchBar";
import { formatLocalTime } from "../utils/FormatTimeUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const weatherContext = useContext(WeatherContext);
  const [storedCity, setStoredCity] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const loadStoredCity = async () => {
      const city = await AsyncStorage.getItem("lastCity");
      if (city) setStoredCity(city);
    };
    loadStoredCity();
  }, []);

  if (!weatherContext) {
    return <Text style={styles.errorText}>Error: Weather context is not available.</Text>;
  }

  const { weather, loading, fetchWeatherData, backgroundImage } = weatherContext;

  if (loading) {
    return <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#0000ff"} />;
  }

  if (!weather) {
    return <Text style={[styles.errorText, { color: isDarkMode ? "#fff" : "red" }]}>Weather data not available.</Text>;
  }

  const forecast = weather.timelines?.daily?.slice(0, 7) || []; // Next 7 days

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
      <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
        <SearchBar onSearch={fetchWeatherData} />
        <View style={styles.container}>
          <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>Weather Forecast for {storedCity}</Text>

          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Weather Details</Text>
          <FlatList
            data={[
              { title: "Wind Speed", value: `${forecast[0]?.values.windSpeedAvg} km/h`, icon: require("../assets/icons/wind.png") },
              { title: "Wind Direction", value: `${forecast[0]?.values.windDirectionAvg}°`, icon: require("../assets/icons/wind-direction.png") },
              { title: "Sunrise", value: formatLocalTime(forecast[0]?.values.sunriseTime), icon: require("../assets/icons/sunrise.png") },
              { title: "Sunset", value: formatLocalTime(forecast[0]?.values.sunsetTime), icon: require("../assets/icons/sunset.png") },
              { title: "Moonrise", value: formatLocalTime(forecast[0]?.values.moonriseTime), icon: require("../assets/icons/moonrise.png") },
              { title: "Moonset", value: formatLocalTime(forecast[0]?.values.moonsetTime), icon: require("../assets/icons/moonset.png") },
            ]}
            keyExtractor={(item) => item.title}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <WeatherInfoCard title={item.title} value={item.value} icon={item.icon} />
            )}
          />

          <Text style={[styles.sectionTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Next 6 Days Forecast</Text>
          <FlatList
            data={forecast}
            keyExtractor={(item) => item.time}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <WeatherCard
                date={item.time.split("T")[0]}
                temperature={item.values.temperatureAvg}
                weatherCode={item.values.weatherCode}
                description={`Min: ${item.values.temperatureMin}°C | Max: ${item.values.temperatureMax}°C`}
              />
            )}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    justifyContent: "space-between",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 20,
  },
});

export default HomeScreen;
