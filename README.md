# React Native Weather App

A simple React Native Weather App that fetches real-time weather data using the Weatherbit API. The app displays the current weather, a 7-day forecast, and weather details like wind speed, humidity, sunrise/sunset times, and more. Users can search for any city, and the background updates dynamically based on the selected city.

Features

✅ Search Bar – Enter a city to fetch weather details.✅ Current Weather – Displays temperature, weather condition, and an icon.✅ 7-Day Forecast – Horizontal scrollable list of upcoming weather conditions.✅ Weather Details – Wind speed, humidity, sunrise/sunset, and more.✅ Dynamic Background – Updates background based on the selected city.✅ Offline Support – Stores the last searched city using AsyncStorage.✅ Context API – Manages global weather state efficiently.✅ Unit Testing – Ensures component functionality using Jest & React Native Testing Library.

📌 Technologies Used

React Native (TypeScript)

Context API (State Management)

Weatherbit API (Weather Data Fetching)

Axios (API Calls)

AsyncStorage (Offline Data Storage)

React Navigation (Stack & Bottom Navigation)

Jest & React Native Testing Library (Unit Tests)

🚀 Getting Started

Prerequisites

Make sure you have the following installed:

Node.js (>= 16.x.x)

React Native CLI / Expo CLI

Android Studio / Xcode (for emulators)

Weatherbit API Key

Installation

Clone the repository:

git clone https://github.com/yourusername/react-native-weather-app.git
cd react-native-weather-app

Install dependencies:

npm install # or yarn install

Set up API Key:

Create a .env file in the root directory.

Add your Weatherbit API key:

WEATHERBIT_API_KEY=your_api_key_here

Run the application:

npx react-native run-android # For Android
npx react-native run-ios # For iOS

🛠 Project Structure

/react-native-weather-app
│── /src
│ ├── /components # Reusable UI components (WeatherCard, SearchBar, etc.)
│ ├── /context # WeatherContext (global state management)
│ ├── /screens # HomeScreen, ForecastScreen
│ ├── /utils # Utility functions (time conversion, API handling)
│ ├── /assets # Icons & Images
│── App.tsx # Root Component
│── package.json # Dependencies & Scripts
│── README.md # Documentation

✅ Unit Testing

We use Jest and React Native Testing Library for unit tests.
Run tests using:

npm test

📌 Future Improvements

📝 License

This project is open-source and available under the MIT License.

👨‍💻 Developed By

Lalit Jadhav | [GitHub](https://github.com/lalitjadhavt3/)

🚀 Happy Coding!
