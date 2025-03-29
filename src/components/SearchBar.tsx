import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {getStyles} from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WeatherContext} from '../state/WeatherProvider';
interface Props {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<Props> = ({onSearch}) => {
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
  useEffect(() => {
    const loadStoredCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('lastCity');
        if (storedCity) {
          setStoredCity(storedCity);
        }
      } catch (err) {
        console.error('Error loading stored city:', err);
      }
    };
    loadStoredCity();
  }, []);
  const [storedCity, setStoredCity] = useState('');

  const [city, setCity] = useState('');
  return (
    <View>
      <View style={styles.searchContainerDiv}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />

        {!city}
        <TouchableOpacity
          style={styles.buttonBg}
          disabled={!city ? true : false}
          onPress={() => onSearch(city)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {!storedCity && (
        <Text style={{color: 'red'}}>Please Enter City Name</Text>
      )}
    </View>
  );
};

export default SearchBar;
