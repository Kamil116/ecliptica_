import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import Grid from "../components/Grid";
import Text from "../components/Text";
import AppBar from "../components/AppBar";
import Footer from "../components/Calendar/Footer/Footer";
// @ts-ignore
import calendarIcon from "../components/imgs/calendar.png";
// @ts-ignore
import mainLogo from "../../../public/app_logo.png";
import axios from "axios";
import useSWR from "swr";
import "./Home.css";
import { getConfigValue } from "../../config";
import { css } from "@emotion/css";
import Box from "@mui/material/Box";

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
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
