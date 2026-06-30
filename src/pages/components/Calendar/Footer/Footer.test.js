import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from "@/pages/components/Calendar/Footer/Footer";

describe('Footer Component', () => {
  test('base render', () => {
    render(<Footer />);
    const copyrightText = screen.getByText('© 2024 Ecliptica Team');
    expect(copyrightText).toBeInTheDocument();
  });

  test('render text', () => {
    render(<Footer />);
    const followText = screen.getByText('Follow us:');
    expect(followText).toBeInTheDocument();
  });

  test('render github', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: 'github' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ch3rnushka/Ecliptica');
  });

  test('render telegram', () => {
    render(<Footer />);
    const telegramLink = screen.getByRole('link', { name: 'telegram' });
    expect(telegramLink).toHaveAttribute('href', 'https://t.me');
  });

  test('render email', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: 'email' });
    expect(emailLink).toHaveAttribute('href', 'mailto:student@innopolis.university');
  });
});
