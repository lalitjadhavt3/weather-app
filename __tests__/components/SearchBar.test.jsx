import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <SearchBar onSearch={() => {}} />,
    );

    expect(getByPlaceholderText('Enter city name')).toBeTruthy(); // Checks if input is rendered
    expect(getByText('Search')).toBeTruthy(); // Checks if button is rendered
  });

  it('updates input value when typing', () => {
    const {getByPlaceholderText} = render(<SearchBar onSearch={() => {}} />);
    const input = getByPlaceholderText('Enter city name');

    fireEvent.changeText(input, 'Mumbai');

    expect(input.props.value).toBe('Mumbai'); // Check if state updates
  });

  it('calls onSearch with the entered city name when search button is pressed', () => {
    const mockOnSearch = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <SearchBar onSearch={mockOnSearch} />,
    );

    const input = getByPlaceholderText('Enter city name');
    const button = getByText('Search');

    fireEvent.changeText(input, 'Delhi');
    fireEvent.press(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Delhi'); // Ensure callback is triggered
  });

  it('calls onSearch with an empty string if search is pressed without input', () => {
    const mockOnSearch = jest.fn();
    const {getByText} = render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.press(getByText('Search'));

    expect(mockOnSearch).toHaveBeenCalledWith(''); // Should be empty if no input is given
  });
});
