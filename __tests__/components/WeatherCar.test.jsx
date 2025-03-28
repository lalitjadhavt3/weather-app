import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherCard from '../components/WeatherCard';
import {formatLocalDate} from '../utils/FormatTimeUtil';

jest.mock('../utils/FormatTimeUtil', () => ({
  formatLocalDate: jest.fn(date => `Formatted ${date}`), // Mock date formatting
}));

describe('WeatherCard Component', () => {
  const mockProps = {
    date: '2025-03-28',
    temperature: 25,
    weatherCode: 1000, // Expected to map to "c01d"
    description: 'Sunny with clear skies',
  };

  it('renders correctly with given props', () => {
    const {getByText, getByRole} = render(<WeatherCard {...mockProps} />);

    expect(getByText('Formatted 2025-03-28')).toBeTruthy(); // Checking formatted date
    expect(getByText('25°C')).toBeTruthy(); // Checking temperature
    expect(getByText('Sunny with clear skies')).toBeTruthy(); // Checking description
    expect(getByRole('image')).toBeTruthy(); // Checking if the icon is displayed
  });

  it('displays correct weather icon based on weatherCode', () => {
    const {getByRole} = render(<WeatherCard {...mockProps} />);
    const image = getByRole('image');

    expect(image.props.source.uri).toBe(
      'https://www.weatherbit.io/static/img/icons/c01d.png',
    );
  });

  it('uses default icon if weatherCode is unknown', () => {
    const {getByRole} = render(
      <WeatherCard {...mockProps} weatherCode={9999} />,
    );
    const image = getByRole('image');

    expect(image.props.source.uri).toBe(
      'https://www.weatherbit.io/static/img/icons/c01d.png',
    ); // Default fallback
  });
});
