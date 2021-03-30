import axios from 'axios';
import authHeader from '../utils/authHeader';

export const eventApi = {
    getEvents,
    joinEvent,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

async function getEvents(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/event/query?page=${page}&limit=${limit}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function joinEvent(eventId) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/event/join`, { eventId }, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}
