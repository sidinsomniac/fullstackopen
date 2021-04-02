import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetails from "./WeatherDetails";

const CountryDetails = ({ filterCountry: country }) => {
    const [weatherDetails, setWeatherDetails] = useState({});

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&query=' + country.name;

    useEffect(() => {
        axios
            .get(weatherUrl)
            .then(response => {
                if (response.data?.current) {
                    setWeatherDetails(response.data.current);
                }
            });
    }, [weatherUrl, apiKey]);

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img width="100" alt={country.name + ' flag'} src={country.flag} />
            {weatherDetails.temperature && <WeatherDetails countryName={country.name} weatherDetails={weatherDetails} />}

        </div>
    );
};

export default CountryDetails;