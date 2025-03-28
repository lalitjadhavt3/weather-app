import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { formatLocalDate } from "../utils/FormatTimeUtil";
interface WeatherCardProps {
  date: string;
  temperature: number;
  weatherCode: number; // Accept weather code instead of icon string
  description: string;
}

// Mapping weatherCode to Weatherbit.io icons
const weatherIconMapping: { [key: number]: string } = {
  1000: "c01d",
  1100: "c02d",
  1101: "c02d",
  1102: "c03d",
  2000: "a05d",
  2100: "a05d",
  4000: "r01d",
  4001: "r02d",
  4200: "r03d",
  4201: "r05d",
  5000: "s01d",
  5100: "s02d",
  5101: "s05d",
  6000: "r01d",
  6200: "r03d",
  7102: "s01d",
  8000: "t01d",
};

const WeatherCard: React.FC<WeatherCardProps> = ({ date, temperature, weatherCode, description }) => {
  const icon = weatherIconMapping[weatherCode] || "c01d"; // Default to clear day if code is unknown
  {  console.log(`https://www.weatherbit.io/static/img/icons/${icon}.png`)}
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatLocalDate(date)}</Text>
      <Image source={{ uri: `https://www.weatherbit.io/static/img/icons/${icon}.png` }} style={styles.icon} />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:150,
    justifyContent:'center'
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  temperature: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default WeatherCard;
