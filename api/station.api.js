import axios from 'axios';
import authHeader from '../utils/authHeader';

export const stationApi = {
    getStations,
};

const apiUrl = 'https://sachtutam.herokuapp.com/api';

async function getStations() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/station/query`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}
