import React from 'react';
import Person from "./Person";

const Contacts = ({ filteredPeople }) => {
    return filteredPeople.map(person => <Person key={person.name} person={person} />);
};

export default Contacts;