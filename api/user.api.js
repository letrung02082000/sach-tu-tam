import axios from 'axios';

export const userApi = {
    login,
    register,
};

const apiUrl = 'http://192.168.43.212:3000/api';

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
