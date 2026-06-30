import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarPage from "@/pages/components/Calendar/CalendarPage/CalendarPage";

jest.mock('../Calendar/Calendar', () => ({ dayCount }) => (
    <div>{dayCount} Day(s) Calendar</div>
));
jest.mock('../Header/Header', () => ({ onCalendarViewChange }) => (
    <>
        <button onClick={() => onCalendarViewChange('weekly')}>7-Day View</button>
        <button onClick={() => onCalendarViewChange('big')}>3-Day View</button>
    </>
));
jest.mock('../Footer/Footer', () => () => <div>Footer</div>);

describe('CalendarPage', () => {
    test('render correctly dayCount for 3-Day view', () => {
        render(<CalendarPage />);
        fireEvent.click(screen.getByText('3-Day View'));
        expect(screen.getByText('3 Day(s) Calendar')).toBeInTheDocument();
        expect(screen.queryByText('7 Day(s) Calendar')).not.toBeInTheDocument();
    });

    test('render correctly for 7-Day view', () => {
        render(<CalendarPage />);
        fireEvent.click(screen.getByText('3-Day View'));
        fireEvent.click(screen.getByText('7-Day View'));
        expect(screen.getByText('7 Day(s) Calendar')).toBeInTheDocument();
        expect(screen.queryByText('3 Day(s) Calendar')).not.toBeInTheDocument();
    });
});
