import React from 'react';
import { WeatherProvider } from './src/context/WeatherProvider';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <WeatherProvider>
   <HomeScreen/>
  </WeatherProvider>
);

export default App;