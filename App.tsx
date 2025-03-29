import React from 'react';
import {WeatherProvider} from './src/state/WeatherProvider';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <WeatherProvider>
    <HomeScreen />
  </WeatherProvider>
);

export default App;
