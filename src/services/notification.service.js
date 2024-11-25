import axios from 'axios';

const BASE_URL = 'http://localhost:3030/api/notification';

export const notificationService = {
    query,
    save,
    remove,
    getById,
};

async function query(forUser) {
    try {
        const { data: notifications } = await axios.get(BASE_URL, { params: { forUser: forUser } });
        return notifications;
    } catch (error) {
        throw error;
    }
}

async function save(notification) {
    try {
        const method = notification._id ? 'put' : 'post'
        const { data: savedNotification } = await axios[method](BASE_URL, notification);
        return savedNotification;
    } catch (error) {
        throw error;
    }
}

async function remove(notificationId) {
    try {
        await axios.delete(`${BASE_URL}/${notificationId}`);
    } catch (error) {
        throw error;
    }
}

async function getById(notificationId) {
    try {
        const { data: notification } = await axios.get(`${BASE_URL}/${notificationId}`);
        return notification;
    } catch (error) {
        throw error;
    }
}

