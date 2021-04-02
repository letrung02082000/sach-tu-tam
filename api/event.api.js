import axios from 'axios';
import authHeader from '../utils/authHeader';

export const eventApi = {
    getEvents,
    joinEvent,
    getEventById,
    leaveEvent,
};

const apiUrl = 'https://sachtutam.herokuapp.com/api';

async function getEvents(page, limit) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${apiUrl}/event/query?page=${page}&limit=${limit}`,
                authHeader()
            )
            .then(
                (response) => {
                    return resolve(response.data);
                },
                (error) => {
                    return reject(error);
                }
            );
    });
}

async function getEventById(eventId) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/event/${eventId}`, authHeader()).then(
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

async function leaveEvent(eventId) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/event/remove`, { eventId }, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}
