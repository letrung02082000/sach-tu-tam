import axios from 'axios';

export const postApi = {
    getPosts,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

async function getPosts(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/post/query?page=${page}&limit=${limit}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}
