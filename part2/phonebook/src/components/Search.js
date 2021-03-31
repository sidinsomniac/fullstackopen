import React from 'react';

const Search = ({ searchVal, handleFilterChange }) => {
    return (<div>
        filter shown with
        <input onChange={handleFilterChange} value={searchVal} />
    </div>);
};

export default Search;