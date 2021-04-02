import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from "./components/CountryDetails";

const App = () => {

    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>
                setCountries(response.data)
            );
    }, []);

    const filterCountries = event => {
        setSearchQuery(event.target.value);
    };

    const renderCountryList = () => {
        if (filteredCountries.length > 10) {
            return <li>Too many matches, specify another filter</li>;
        }
        if (filteredCountries.length === 1) {
            return <CountryDetails filterCountry={filteredCountries[0]} />;
        }
        return filteredCountries.map(country => <li key={country.callingCodes[0]}>{country.name}</li>);
    };

    return (
        <div>
            <div>
                find countries <input value={searchQuery} onChange={filterCountries} />
            </div>
            <ul>
                {renderCountryList()}
            </ul>
        </div>
    );
};

export default App;