import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default ({ data, handleRgbSliderChange }) => {
    const [red, setRed] = useState(data.red_value);
    const [green, setGreen] = useState(data.green_value);
    const [blue, setBlue] = useState(data.blue_value);

    const handleRedSlider = (event, newValue) => {
        console.log("red: ", newValue);
        setRed(newValue);
        handleRgbSliderChange("red_value", newValue);
    };

    const handleGreenSlider = (event, newValue) => {
        console.log("green: ", newValue);
        setGreen(newValue);
        handleRgbSliderChange("green_value", newValue);
    };

    const handleBlueSlider = (event, newValue) => {
        console.log("blue: ", newValue);
        setBlue(newValue);
        handleRgbSliderChange("blue_value", newValue);
    };

    return (
        <div>
            <Box sx={{ width: 300 }}>
                <Slider
                    value={red}
                    onChange={handleRedSlider}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                />
                <Slider
                    value={green}
                    onChange={handleGreenSlider}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                />
                <Slider
                    value={blue}
                    onChange={handleBlueSlider}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                />
            </Box>
        </div>
    );
};
