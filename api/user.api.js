import axios from 'axios';

export const userApi = {
    login,
    register,
};

const apiUrl = 'localhost:3000/api';

async function login(email, password) {
    return new Promise((resolve, reject) => {
        const user = {
            email,
            password,
        };

        axios.post(`${apiUrl}/user/login`, user).then(
            (response) => {
                console.log(response.data);
                return resolve(response.data);
            },
            (error) => {
                console.log(error);
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

        axios.post(`${apiUrl}/user/register`, user).then(
            (response) => {
                console.log(response.data);
                resolve(response.data);
            },
            (error) => {
                console.log(error);
                reject(error);
            }
        );
    });
}
