import axios from 'axios';
const baseUrl = '/api/persons';

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
        .then(response => response.data);
};

const update = (id, newObj) => {
    return axios
        .put(`${baseUrl}/${id}`, newObj)
        .then(response => response.data);
};

const deleteContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data);
};

const restRotues = { getAll, create, update, deleteContact };

export default restRotues;