import React, { useState, useEffect } from 'react';
import AddPerson from "./components/AddPerson";
import Search from "./components/Search";
import Contacts from "./components/Contacts";
import contacts from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const renderContacts = () => {
        contacts.getAll().then(res => setPersons(res));
    };

    useEffect(renderContacts, []);


    const filteredPeople = persons.filter(person =>
        person?.name?.toLowerCase().trim().includes(searchVal.toLowerCase().trim())
    );

    const addPerson = event => {
        event.preventDefault();
        // if (!(newName && newNumber)) return;
        // let newPersonObj = { name: newName, number: newNumber };
        // let sameName = persons.find(person => person.name === newName);
        // if (sameName?.id) {
        //     if (window.confirm(`${sameName?.name} is already added to phonebook, replace old number with new one?`))
        //         updateContact(sameName?.id, newPersonObj);
        // } else {
        //     createNewContact(newPersonObj);
        // }
        let newPersonObj = { name: newName, number: newNumber };
        createNewContact(newPersonObj);
        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = event => {
        setSearchVal(event.target.value);
    };

    const createNewContact = obj => {
        contacts.create(obj)
            .then(response => setPersons(persons.concat(response)))
            .then(
                () => {
                    setSuccessMessage(newName + " added!");
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                }
            ).catch(err => {
                setErrorMessage(err.response.data.error);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            });
    };

    // const updateContact = (id, obj) => {
    //     contacts
    //         .update(id, obj)
    //         .then(renderContacts)
    //         .catch(err => {
    //             setErrorMessage(`Information of ${obj.name} has already been removed from server`);
    //             setTimeout(() => {
    //                 setErrorMessage('');
    //             }, 3000);
    //         });
    // };

    return (
        <div>
            <h2>Phonebook</h2>
            {successMessage && <Notification message={successMessage} typeOfClass={'success'} />}
            {errorMessage && <Notification message={errorMessage} typeOfClass={'error'} />}
            <Search searchVal={searchVal} handleFilterChange={handleFilterChange} />
            <AddPerson addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <Contacts renderContacts={renderContacts} filteredPeople={filteredPeople} />
        </div>
    );
};

export default App;