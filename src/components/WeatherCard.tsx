import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {formatLocalDate} from '../utils/FormatTimeUtil';
import {getStyles} from '../styles/globalStyles';
import {WeatherContext} from '../state/WeatherProvider';
interface WeatherCardProps {
  date: string;
  temperature: number;
  weatherCode: number; // Accept weather code instead of icon string
  description: string;
}

// Mapping weatherCode to Weatherbit.io icons
const weatherIconMapping: {[key: number]: string} = {
  1000: 'c01d',
  1100: 'c02d',
  1101: 'c02d',
  1102: 'c03d',
  2000: 'a05d',
  2100: 'a05d',
  4000: 'r01d',
  4001: 'r02d',
  4200: 'r03d',
  4201: 'r05d',
  5000: 's01d',
  5100: 's02d',
  5101: 's05d',
  6000: 'r01d',
  6200: 'r03d',
  7102: 's01d',
  8000: 't01d',
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperature,
  weatherCode,
  description,
}) => {
  const icon = weatherIconMapping[weatherCode] || 'c01d'; // Default to clear day if code is unknown
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    return (
      <Text style={{color: 'red'}}>
        Error: Weather context is not available.
      </Text>
    );
  }

  const {theme} = weatherContext;
  const styles = getStyles(theme);
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatLocalDate(date)}</Text>
      <Image
        source={{uri: `https://www.weatherbit.io/static/img/icons/${icon}.png`}}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default WeatherCard;
