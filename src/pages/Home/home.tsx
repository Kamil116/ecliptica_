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

    const params = new URLSearchParams(url.split("?")[1]);
    const alias = (params.get("alias") || "").toLowerCase();

    // ВАЖНО: Если alias пустой (мы запрашиваем список без поиска),
    // возвращаем ВСЕ растения из мока.
    const filtered = alias
        ? mockPlants.filter((plant) =>
              plant.alias.toLowerCase().startsWith(alias),
          )
        : mockPlants;

    return { results: filtered };
};

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [userPlants, setUserPlants] = useState([]);

    const [activeTab, setActiveTab] = useState("my");

    // Дебаунс для поиска
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const shouldFetch = debouncedSearchTerm !== "" || activeTab === "all";

    const {
        data: plants,
        error,
        isLoading,
    } = useSWR(
        shouldFetch
            ? `${getConfigValue("ecliptica.backend")}/plants/list?alias=${debouncedSearchTerm}`
            : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    // Загрузка пользовательских растений
    useEffect(() => {
        const savedPlants = JSON.parse(
            localStorage.getItem("userPlants") || "[]",
        );
        setUserPlants(savedPlants);
    }, []);

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
                    <Text
                        color="#333333"
                        fontSize="30px"
                        className="title-text"
                    >
                        Plants
                    </Text>

                    <div className="search-container">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search plants..."
                        />
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

            {debouncedSearchTerm === "" && (
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        padding: "0 20px",
                        marginBottom: "15px",
                        marginTop: "15px",
                    }}
                >
                    <span
                        onClick={() => setActiveTab("my")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: activeTab === "my" ? "bold" : "normal",
                            color: activeTab === "my" ? "#2E7D32" : "#888",
                            borderBottom:
                                activeTab === "my"
                                    ? "2px solid #2E7D32"
                                    : "none",
                        }}
                    >
                        My Plants
                    </span>
                    <span
                        onClick={() => setActiveTab("all")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            fontWeight: activeTab === "all" ? "bold" : "normal",
                            color: activeTab === "all" ? "#2E7D32" : "#888",
                            borderBottom:
                                activeTab === "all"
                                    ? "2px solid #2E7D32"
                                    : "none",
                        }}
                    >
                        Explore All
                    </span>
                </div>
            )}

            <div className="grid-container">
                <Grid>
                    {debouncedSearchTerm !== "" ? (
                        isLoading ? (
                            <p>Searching...</p>
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
                                No results found for &quot;{debouncedSearchTerm}
                                &quot;.
                            </p>
                        )
                    ) : activeTab === "my" ? (
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
                    ) :
                    isLoading ? (
                        <p>Loading plants...</p>
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
                        <p>No plants available.</p>
                    )}
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
