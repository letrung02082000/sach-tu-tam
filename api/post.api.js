import axios from 'axios';
import authHeader from '../utils/authHeader';

export const postApi = {
    getPosts,
    likePost,
    removeLikePost,
    getComments,
    postComment,
    getPostsByBookId,
};

const apiUrl = 'https://sachtutam.herokuapp.com/api';

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

async function removeLikePost(postId) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/post/removelike`, { postId: postId }, authHeader())
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

async function getComments(postId) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/post/comment?post=${postId}`, authHeader()).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function postComment(postId, comment) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiUrl}/post/comment`, { postId, comment }, authHeader())
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

async function getPostsByBookId(page, limit, bookId) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${apiUrl}/book/review/${bookId}?page=${page}&limit=${limit}`,
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
