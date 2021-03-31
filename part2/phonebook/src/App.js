import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const filteredPeople = persons.filter(person => {
        if (person.name.toLowerCase().trim().includes(searchVal.toLowerCase().trim())) {
            return person;
        }

    });


    const addPerson = event => {
        event.preventDefault();
        debugger;
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
            <div>
                filter shown with
                <input onChange={handleFilterChange} value={searchVal} />
            </div>
            <form onSubmit={addPerson}>
                <h2>add a new</h2>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredPeople.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    );
};

export default App;