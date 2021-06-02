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

const anecdoteServices = { getAll, createAnecdote };

export default anecdoteServices;