import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const addPerson = event => {
        event.preventDefault();
        if (!newName) return;
        let sameName = persons.filter(person => person.name === newName);
        if (sameName.length) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        let newPersonArray = persons.concat({ name: newName });
        setPersons(newPersonArray);
        setNewName('');
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}>{person.name}</div>)}
        </div>
    );
};

export default App;