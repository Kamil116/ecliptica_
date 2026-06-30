import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DayCard from "@/pages/components/Calendar/DayCard/DayCard";
import { MemoryRouter } from 'react-router-dom';


const mockDate = new Date();
const mockDayOffset = 0;
const mockFlower = 'Cactus';
const mockImage = 'https://avatars.mds.yandex.net/i?id=eb69cd6e6d9610f1ed6801c530276ab0_l-10696380-images-thumbs&n=13';

describe('DayCard Component', () => {
  test('checks the date', () => {
    render(
      <MemoryRouter>
        <DayCard day={mockDayOffset} plant={{
          name: mockFlower,
          image: mockImage,
        }} />
      </MemoryRouter>);

    const expectedDate = new Date(mockDate);
    expectedDate.setDate(expectedDate.getDate() + mockDayOffset);

    const dayName = expectedDate.toUTCString().split(',')[0];
    const day = expectedDate.getDate();
    const month = expectedDate.toUTCString().split(',')[1].split(' ')[2];

    expect(screen.getByText(dayName)).toBeInTheDocument();
    expect(screen.getByText(day.toString())).toBeInTheDocument();
    expect(screen.getByText(month)).toBeInTheDocument();
  });

  test('correct rendering when there is plant', () => {
    render(<MemoryRouter>
      <DayCard day={mockDayOffset} plant={{
        id: '1',
        alias: mockFlower,
        image_url: mockImage,
      }} /></MemoryRouter>,
    );


    expect(screen.getByText(mockFlower)).toBeInTheDocument();
    expect(screen.getByAltText(mockFlower)).toHaveAttribute('src', mockImage);
  });

  test('correct rendering when there is no plant', () => {
    render(
      <MemoryRouter>
        <DayCard day={mockDayOffset} plant={null} />
      </MemoryRouter>);

    expect(screen.getByText('No plant')).toBeInTheDocument();
  });

  test('check if status of button changes on click', () => {
    render(
      <MemoryRouter>
        <DayCard day={mockDayOffset} plant={{
          id: '1',
          alias: mockFlower,
          image_url: mockImage,
        }} />
      </MemoryRouter>
    );

    const wateredButton = screen.getByRole('button', { name: /Watered/i });
    expect(wateredButton).toBeInTheDocument();
    expect(wateredButton).toHaveTextContent('Watered');

    // click
    fireEvent.click(wateredButton);
    expect(wateredButton).toHaveTextContent('Not watered');

    // click again, should revert
    fireEvent.click(wateredButton);
    expect(wateredButton).toHaveTextContent('Watered');
  });
});
