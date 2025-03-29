import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {WeatherContext} from '../state/WeatherProvider';
import {getStyles} from '../styles/globalStyles';
interface WeatherInfoCardProps {
  title: string;
  value: string | number;
  icon: any;
}

const WeatherInfoCard: React.FC<WeatherInfoCardProps> = ({
  title,
  value,
  icon,
}) => {
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
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default WeatherInfoCard;
