import axios from 'axios';
import { asObject } from "../utils/store-helper";

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async anecdote => {
    const content = asObject(anecdote);
    const response = await axios.post(baseUrl, content);
    return response.data;
};

const updateAnecdote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
    return response.data;
};

const anecdoteServices = { getAll, createAnecdote, updateAnecdote };

export default anecdoteServices;