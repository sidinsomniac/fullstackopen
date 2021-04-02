import React from 'react';

const CountryList = ({ filteredCountries, setSearchQuery }) => {
    return filteredCountries.map(country => <li key={country.callingCodes[0]}>{country.name} <button onClick={() => setSearchQuery(country.name)}>show</button></li>);
};

export default CountryList;