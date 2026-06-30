import { css } from "@emotion/css";
import DayCard from "@/pages/components/Calendar/DayCard/DayCard";
import React from "react";
import { getConfigValue } from "@/config";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

interface CalendarProps {
    dayCount: number;
}

export default function WeeklyCalendar({ dayCount }: CalendarProps) {
    // fetch plants
    const {
        data: plants,
        error,
        isValidating: loading,
    } = useSWRImmutable(
        `${getConfigValue("ecliptica.backend")}/plants/list?alias=a`,
        fetcher,
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading plants: {error.message}</div>;

    return (
        <div
            id="calendars"
            className={css`
                display: flex;
            `}
        >
            {[...Array(dayCount)].map((_, dayOffset) => {
                const plant = plants?.results
                    ? plants.results[dayOffset]
                    : null;
                return (
                    <DayCard key={dayOffset} day={dayOffset} plant={plant} />
                );
            })}
        </div>
    );
}
