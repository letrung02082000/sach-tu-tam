import axios from 'axios';
import authHeader from '../utils/authHeader';

export const userApi = {
    login,
    register,
    getAllEvents,
    getAllOrders,
    getAllDonations,
    postDonation,
    updateInfo,
    changeUsername,
    postReview,
    getPendingOrders,
    getConfirmedOrders,
};

const apiUrl = 'https://sachtutam.herokuapp.com/api';

async function login(email, password) {
    return new Promise((resolve, reject) => {
        const user = {
            email,
            password,
        };

        axios.post(`${apiUrl}/user/login`, user).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function register(email, password) {
    return new Promise((resolve, reject) => {
        const user = {
            email,
            password,
        };

        axios.post(`${apiUrl}/user/signup`, user).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log('loi');
                return reject(error);
            }
        );
    });
}

async function getAllEvents() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/user/allevents`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
                return reject(error);
            }
        );
    });
}

async function getAllOrders() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/user/allorders`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
                return reject(error);
            }
        );
    });
}

async function getAllDonations() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/user/alldonations`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
                return reject(error);
            }
        );
    });
}

async function postDonation(donation) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/user/donation`, donation, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function updateInfo(userInfo) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/user/updateinfo`, userInfo, authHeader()).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

async function changeUsername(username) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/user/changeusername`, userInfo, authHeader())
            .then(
                (response) => resolve(response.data),
                (error) => reject(error)
            );
    });
}

async function postReview(post) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/post/create`, post, authHeader()).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

async function getPendingOrders() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/user/pendingorders`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
                return reject(error);
            }
        );
    });
}

async function getConfirmedOrders() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/user/confirmedorders`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
                return reject(error);
            }
        );
    });
}
