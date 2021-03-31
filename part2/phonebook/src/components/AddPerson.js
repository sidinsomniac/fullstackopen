import React from 'react';

const AddPerson = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return <form onSubmit={addPerson}>
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
    </form>;
};

export default AddPerson;