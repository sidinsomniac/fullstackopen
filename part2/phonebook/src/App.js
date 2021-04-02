import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPerson from "./components/AddPerson";
import Search from "./components/Search";
import Contacts from "./components/Contacts";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response =>
                setPersons(response.data)
            );
    }, []);

    const filteredPeople = persons.filter(person =>
        person.name.toLowerCase().trim().includes(searchVal.toLowerCase().trim())
    );

    const addPerson = event => {
        event.preventDefault();
        if (!(newName && newNumber)) return;
        let sameName = persons.filter(person => person.name === newName);
        if (sameName.length) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        let newPersonArray = persons.concat({ name: newName, number: newNumber });
        setPersons(newPersonArray);
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Search searchVal={searchVal} handleFilterChange={handleFilterChange} />
            <AddPerson addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <Contacts filteredPeople={filteredPeople} />
        </div>
    );
};

export default App;