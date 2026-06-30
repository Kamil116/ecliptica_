import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantCard from "@/pages/components/PlantCard";
import Grid from "@/pages/components/Grid";
import Text from "@/pages/components/Text";
import AppBar from "@/pages/components/AppBar.jsx";
import Footer from "@/pages/components/Calendar/Footer/Footer";
import calendarIcon from "@/pages/components/imgs/calendar.png";
import mainLogo from "/app_logo.png";
import useSWR from "swr";
import "./Home.css";
import { getConfigValue } from "@/config";
import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import { mockPlants } from "../../../data/mockPlants";

const fetcher = async (url: string) => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Получаем alias из URL
    const params = new URLSearchParams(url.split("?")[1]);
    const alias = (params.get("alias") || "a").toLowerCase();

    // Фильтруем данные из импортированного массива
    const filtered =
        alias === "a"
            ? mockPlants
            : mockPlants.filter((plant) =>
                  plant.alias.toLowerCase().startsWith(alias),
              );

    return { results: filtered };
};

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userPlants, setUserPlants] = useState([]);
    const [submittedTerm, setSubmittedTerm] = useState("");

    // fetch plants
    const {
        data: plants,
        error,
        isValidating: loading,
    } = useSWR(
        `${getConfigValue("ecliptica.backend")}/plants/list?alias=${submittedTerm || "a"}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSubmittedTerm(searchTerm);
        }
    };

    // user plant list
    useEffect(() => {
        const savedPlants = JSON.parse(
            localStorage.getItem("userPlants") || "[]",
        );
        setUserPlants(savedPlants);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="home-container">
            <AppBar>
                <div className="header-container">
                    <Box id="logo" sx={{ marginRight: "20px" }}>
                        <img
                            src={mainLogo}
                            alt="Ecliptica Logo"
                            className={css`
                                height: 55px;
                                width: auto;
                            `}
                        />
                    </Box>
                    {/* Title */}
                    <Text
                        color="#333333"
                        fontSize="30px"
                        className="title-text"
                    >
                        My Plants
                    </Text>

                    {/* Search Bar and Calendar */}
                    <div className="search-container">
                        {/* Search Bar */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search plants..."
                        />
                        {/* Calendar Button */}
                        <Link
                            to="/ecliptica/calendar"
                            className="calendar-link"
                        >
                            <img
                                src={calendarIcon}
                                className="calendar-icon"
                                alt="Calendar"
                            />
                        </Link>
                    </div>
                </div>
            </AppBar>

            <div className="grid-container">
                <Grid>
                    {searchTerm === "" ? (
                        userPlants.length > 0 ? (
                            userPlants.map((plant) => (
                                <Link
                                    key={plant.id}
                                    to={`/ecliptica/info/${plant.id}`}
                                    state={{ plant }}
                                    className="plant-link"
                                >
                                    <PlantCard
                                        name={plant.alias}
                                        imageUrl={plant.image_url}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p>Add plants to your collection!</p>
                        )
                    ) : plants && plants.results.length > 0 ? (
                        plants.results.map((plant) => (
                            <Link
                                key={plant.id}
                                to={`/ecliptica/info/${plant.id}`}
                                state={{ plant }}
                                className="plant-link"
                            >
                                <PlantCard
                                    name={plant.alias}
                                    imageUrl={plant.image_url}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>
                            No results found for &quot;{searchTerm}&quot;. Try
                            another search.
                        </p>
                    )}
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
