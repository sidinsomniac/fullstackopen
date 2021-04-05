import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(err => {
            alert("There was a server error. Please retry.", err);
        });
};

const create = newObj => {
    return axios
        .post(baseUrl, newObj)
        .then(response => response.data)
        .catch(err => {
            alert("There was a server error. Please retry.", err);
        });
};

const update = (id, newObj) => {
    return axios
        .put(`${baseUrl}/${id}`, newObj)
        .then(response => response.data)
        .catch(err => {
            alert("There was a server error. Please retry.", err);
        });
};

const deleteContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
        .catch(err => {
            alert("There was a server error. Please retry.", err);
        });
};

export default { getAll, create, update, deleteContact };