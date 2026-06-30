import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./info.css";
import AppBar from "@/pages/components/AppBar";
import Text from "@/pages/components/Text";
import addIcon from "@/pages/components/imgs/add.png";
import removeIcon from "@/pages/components/imgs/remove.png";
import mainLogo from "/app_logo.png";
import Footer from "@/pages/components/Calendar/Footer/Footer";
import { css } from "@emotion/css";
import Box from "@mui/material/Box";

const Info = () => {
    const location = useLocation();
    const { plant } = location.state;
    const navigate = useNavigate();

    const savedPlants = JSON.parse(localStorage.getItem("userPlants") || "[]");
    const plantExists = savedPlants.some(
        (savedPlant) => savedPlant.id === plant.id,
    );

    const addToMyPlants = () => {
        if (!plantExists) {
            const updatedPlants = [...savedPlants, plant];
            localStorage.setItem("userPlants", JSON.stringify(updatedPlants));
            navigate("/ecliptica/");
        }
    };

    const removeFromMyPlants = () => {
        const updatedPlants = savedPlants.filter(
            (savedPlant) => savedPlant.id !== plant.id,
        );
        localStorage.setItem("userPlants", JSON.stringify(updatedPlants));
        navigate("/ecliptica/");
    };

    if (!plant) {
        return <div>Plant not found</div>;
    }

    return (
        <div>
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
                    <Link to="/ecliptica/" className="my-plants-link">
                        <Text
                            color="#333333"
                            fontSize="30px"
                            className="my-plants-text"
                        >
                            My Plants
                        </Text>
                    </Link>

                    {!plantExists ? (
                        <button onClick={addToMyPlants} className="icon-button">
                            <img
                                src={addIcon}
                                className="icon-image"
                                alt="Add to My Plants"
                            />
                        </button>
                    ) : (
                        <button
                            onClick={removeFromMyPlants}
                            className="icon-button"
                        >
                            <img
                                src={removeIcon}
                                className="icon-image"
                                alt="Remove from My Plants"
                            />
                        </button>
                    )}
                </div>
            </AppBar>
            <div className="info-container">
                <h1>{plant.name}</h1>
                <img
                    src={plant.image_url}
                    alt={plant.id}
                    className="info-image"
                />
                <p>
                    <strong>Alias:</strong> {plant.alias}
                </p>
                <p>
                    <strong>Temperature Range:</strong> {plant.min_temp} -{" "}
                    {plant.max_temp} °C
                </p>
                <p>
                    <strong>Humidity Range:</strong> {plant.min_env_humid} -{" "}
                    {plant.max_env_humid} %
                </p>
                <p>
                    <strong>Soil Moisture Range:</strong> {plant.min_soil_moist}{" "}
                    - {plant.max_soil_moist}
                </p>
                <p>
                    <strong>Soil EC Range:</strong> {plant.min_soil_ec} -{" "}
                    {plant.max_soil_ec} dS/m
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Info;
