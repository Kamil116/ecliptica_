import React, { useState } from "react";
import Calendar from "@/pages/components/Calendar/Calendar/Calendar";
import Header from "@/pages/components/Calendar/Header/Header";
import Footer from "@/pages/components/Calendar/Footer/Footer";

export default function CalendarPage() {
    const [calendarView, setCalendarView] = useState("weekly");

    const getDayCount = () => {
        return calendarView === "weekly" ? 7 : 3;
    };

    return (
        <div>
            <Header onCalendarViewChange={setCalendarView} />
            <Calendar dayCount={getDayCount()} />
            <Footer />
        </div>
    );
}
