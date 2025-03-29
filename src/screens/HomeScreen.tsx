import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import WeatherCard from '../components/WeatherCard';
import WeatherInfoCard from '../components/WeatherInfoCard';
import {WeatherContext} from '../state/WeatherProvider';
import SearchBar from '../components/SearchBar';
import {formatLocalTime} from '../utils/FormatTimeUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStyles} from '../styles/globalStyles';

const HomeScreen = () => {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    return (
      <Text style={{color: 'red'}}>
        Error: Weather context is not available.
      </Text>
    );
  }

  const {
    weather,
    loading,
    fetchWeatherData,
    backgroundImage,
    toggleTheme,
    theme,
  } = weatherContext;

  const [storedCity, setStoredCity] = useState<string>('');
  const styles = getStyles(theme); // 🎨 Pass theme to styles

  useEffect(() => {
    const loadStoredCity = async () => {
      try {
        const city = await AsyncStorage.getItem('lastCity');
        if (city) {
          setStoredCity(city);
        }
      } catch (err) {
        console.error('Error loading stored city:', err);
      }
    };
    loadStoredCity();
  }, []);

  const handleSearch = useCallback(
    (city: string) => {
      fetchWeatherData(city);
      setStoredCity(city);
    },
    [fetchWeatherData],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <Text style={styles.errorText}>Weather Data not Found</Text>
      </View>
    );
  }

  const forecast = weather.timelines?.daily?.slice(0, 7) || []; // Next 7 days

  return (
    <ScrollView
      style={styles.searchContainer}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{uri: backgroundImage}}
        style={styles.background}>
        <SearchBar onSearch={handleSearch} />
        {storedCity && (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Weather Forecast for {storedCity}</Text>

            <Text style={styles.sectionTitle}>Weather Details</Text>
            <FlatList
              data={[
                {
                  title: 'Wind Speed',
                  value: `${forecast[0]?.values.windSpeedAvg} km/h`,
                  icon: require('../assets/icons/wind.png'),
                },
                {
                  title: 'Wind Direction',
                  value: `${forecast[0]?.values.windDirectionAvg}°`,
                  icon: require('../assets/icons/wind-direction.png'),
                },
                {
                  title: 'Sunrise',
                  value: formatLocalTime(forecast[0]?.values.sunriseTime),
                  icon: require('../assets/icons/sunrise.png'),
                },
                {
                  title: 'Sunset',
                  value: formatLocalTime(forecast[0]?.values.sunsetTime),
                  icon: require('../assets/icons/sunset.png'),
                },
                {
                  title: 'Moonrise',
                  value: formatLocalTime(forecast[0]?.values.moonriseTime),
                  icon: require('../assets/icons/moonrise.png'),
                },
                {
                  title: 'Moonset',
                  value: formatLocalTime(forecast[0]?.values.moonsetTime),
                  icon: require('../assets/icons/moonset.png'),
                },
              ]}
              keyExtractor={item => item.title}
              numColumns={2}
              columnWrapperStyle={styles.row}
              renderItem={({item}) => (
                <WeatherInfoCard
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                />
              )}
              nestedScrollEnabled={true} // ✅ Fix nested scrolling issue
            />

            <Text style={styles.sectionTitle}>Next 6 Days Forecast</Text>
            <FlatList
              data={forecast}
              keyExtractor={item => item.time}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <WeatherCard
                  date={item.time.split('T')[0]}
                  temperature={item.values.temperatureAvg}
                  weatherCode={item.values.weatherCode}
                  description={`Min: ${item.values.temperatureMin}°C | Max: ${item.values.temperatureMax}°C`}
                />
              )}
              nestedScrollEnabled={true}
            />
          </View>
        )}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
          <Text style={styles.toggleButtonText}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

export default HomeScreen;
