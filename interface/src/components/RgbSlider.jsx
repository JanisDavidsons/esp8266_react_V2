import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default ({
    //  setDataHandler,
    //  saveDataHandler,
    data
}) => {
    console.log(data);
    const [red, setRed] = useState(data.red_value);
    const [green, setGreen] = useState(data.green_value);
    const [blue, setBlue] = useState(data.blue_value);

    const handleRedSlider = (event, newValue = 0) => {
        console.log("red: ", newValue);
        setRed(newValue);
        sendToApi();
    };

    const handleGreenSlider = (event, newValue) => {
        console.log("green: ", newValue);
        setGreen(newValue);
        sendToApi();
    };

    const handleBlueSlider = (event, newValue) => {
        console.log("blue: ", newValue);
        setBlue(newValue);
        sendToApi();
    };

    const handleRedInputChange = (event) => {
        setRed(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    };

    const handleGreenInputChange = (event) => {
        setGreen(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    };

    const handleBlueInputChange = (event) => {
        setBlue(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    };

    const sendToApi = () => {
        // setDataHandler(
        //     { led_on: true, red_value: red, green_value: green, blue_value: blue },
        //     saveDataHandler);
    };

    const handleBlur = (color) => {
        switch (color) {
            case "red":
                if (red < 0) {
                    setRed(0);
                } else if (red > 255) setRed(255);
                break;
            case "green":
                if (green < 0) {
                    setGreen(0);
                } else if (green > 255) setGreen(255);
                break;
            case "blue":
                if (blue < 0) {
                    setBlue(0);
                } else if (blue > 255) setBlue(255);
                break;
            default:
                break;
        }
    };

    return (
        <div>

            <Box sx={{ width: 300 }}>
                <Slider
                    // defaultValue={50}
                    value={red}
                    onChange={handleRedSlider}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                />

                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
            </Box>

            {/* Red slider */}

            {/* Green slider */}

            {/* blue sider */}

        </div>
    );
};
