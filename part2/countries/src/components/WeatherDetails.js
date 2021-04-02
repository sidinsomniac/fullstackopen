import React from 'react';

const WeatherDetails = ({ countryName, weatherDetails }) => {
    return (
        <div>
            <h2>Weather in {countryName}</h2>
            <div><strong>temperature:</strong> {weatherDetails.temperature}C</div>
            <img width="100" alt={countryName + ' weather'} src={weatherDetails.weather_icons[0]} />
            <div><strong>wind:</strong> {weatherDetails.wind_speed}mph direction {weatherDetails.wind_dir}</div>
        </div>
    );
};

export default WeatherDetails;