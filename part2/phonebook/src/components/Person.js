import React from 'react';
import contacts from "../services/contacts";

const deleteContact = (person, renderContacts) => {
    if (window.confirm(`Delete ${person.name}?`)) {
        contacts.deleteContact(person.id)
            .then(renderContacts)
            .catch(err => {
                alert("There was a server error. Please retry.", err);
            });
    }
};

const Person = ({ person, renderContacts }) => (
    <>
        <div>{person.name} {person.number}
            <button onClick={() => deleteContact(person, renderContacts)}>delete</button>
        </div>
    </>
);

export default Person;