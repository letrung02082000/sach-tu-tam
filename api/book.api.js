import axios from 'axios';

export const bookApi = {
    getAllBooks,
    getBookBySku,
    getBestseller,
    getBookById,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

async function getAllBooks(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/query?page=${page}&limit=${limit}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function getBookBySku(bookSku) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/sku/${bookSku}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function getBookById(bookId) {
    console.log(bookId);
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/${bookId}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function getBestseller(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/bestseller?page=${page}&limit=${limit}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}
