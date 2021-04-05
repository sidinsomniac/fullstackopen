import React from 'react';
import Person from "./Person";

const Contacts = ({ filteredPeople, renderContacts }) => {
    return filteredPeople.map(person => <Person renderContacts={renderContacts} key={person.id} person={person} />);
};

export default Contacts;