import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '12315156' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const addPerson = event => {
        event.preventDefault();
        if (!(newName && newNumber)) return;
        let sameName = persons.filter(person => person.name === newName);
        if (sameName.length) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        let newPersonArray = persons.concat({ name: newName, phone: newNumber });
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
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
            {persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}
        </div>
    );
};

export default App;