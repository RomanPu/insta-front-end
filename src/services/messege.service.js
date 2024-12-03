import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/message/' :
    '//localhost:3030/api/message/'

export const messegeService = {
    query,
    save,
    remove,
    getById,
};

async function query(forUser) {
    try {
        const { data: messages } = await axios.get(BASE_URL, { params: { forUser: forUser } });
        return messages;
    } catch (error) {
        throw error;
    }
}

async function save(message) {
    try {
        const method = message._id ? 'put' : 'post';
        const { data: savedMessage } = await axios[method](BASE_URL, message);
        return savedMessage;
    } catch (error) {
        throw error;
    }
}

async function remove(messageId) {
    try {
        await axios.delete(`${BASE_URL}/${messageId}`);
    } catch (error) {
        throw error;
    }
}

async function getById(messageId) {
    try {
        const { data: message } = await axios.get(`${BASE_URL}/${messageId}`);
        return message;
    } catch (error) {
        throw error;
    }
}