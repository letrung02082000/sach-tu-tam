import axios from 'axios';
import authHeader from '../utils/authHeader';

export const postApi = {
    getPosts,
    likePost,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

async function getPosts(page, limit) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${apiUrl}/post/query?page=${page}&limit=${limit}`,
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

async function likePost(postId) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/post/like`, { postId: postId }, authHeader())
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
