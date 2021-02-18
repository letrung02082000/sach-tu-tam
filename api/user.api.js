import axios from 'axios';

export const userApi = {
    login,
    register,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

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
