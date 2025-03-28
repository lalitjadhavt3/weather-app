import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface WeatherInfoCardProps {
  title: string;
  value: string | number;
  icon: any;
}

const WeatherInfoCard: React.FC<WeatherInfoCardProps> = ({ title, value, icon }) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background for contrast
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    minWidth: "45%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text for better contrast
    textAlign: "center",
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f5f5f5", // Light gray for better contrast
  },
});

export default WeatherInfoCard;
