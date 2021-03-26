import axios from 'axios';

export const eventApi = {
    getEvents,
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
