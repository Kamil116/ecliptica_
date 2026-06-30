import { css } from "@emotion/css";
import DayCard from "@/pages/components/Calendar/DayCard/DayCard";
import React from "react";
import useSWRImmutable from "swr/immutable";

const fetcher = async () => {
    // Имитируем задержку
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Достаем сохраненные растения пользователя
    const saved = localStorage.getItem("userPlants");
    const parsedPlants = saved ? JSON.parse(saved) : [];

    return { results: parsedPlants };
};

interface CalendarProps {
    dayCount: number;
}

export default function WeeklyCalendar({ dayCount }: CalendarProps) {
    const {
        data: plants,
        error,
        isLoading,
    } = useSWRImmutable(
        "local://user-plants",
        fetcher,
        {
            revalidateOnMount: true,
        },
    );

    if (isLoading)
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                Loading calendar...
            </div>
        );
    if (error) return <div>Error loading plants: {error.message}</div>;

    const results = plants?.results || [];

    return (
        <div
            id="calendars"
            className={css`
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                padding: 20px;
                justify-content: center;
            `}
        >
            {[...Array(dayCount)].map((_, dayOffset) => {
                const plant =
                    results.length > 0
                        ? results[dayOffset % results.length]
                        : null;

                return (
                    <div
                        key={dayOffset}
                        className={css`
                            width: calc(25% - 15px);
                            min-width: 250px;
                            max-width: 320px;
                            @media (max-width: 768px) {
                                width: 100%;
                            }
                        `}
                    >
                        <DayCard day={dayOffset} plant={plant} />
                    </div>
                );
            })}
        </div>
    );
}
