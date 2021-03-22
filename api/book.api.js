import axios from 'axios';

export const bookApi = {
    getAllBooks,
    getBookBySku,
    getBestseller,
    getBookById,
    postOrder,
    getFavorite,
    getAllCategories,
    search,
    getBooksByCategories,
    getBooksByCategory,
};

const apiUrl = 'https://sach-tu-tam.herokuapp.com/api';

async function getAllBooks(page, limit) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/book/query?page=${page}&limit=${limit}&quantity=0`)
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

async function getFavorite(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/favorite?page=${page}&limit=${limit}`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function postOrder(orderInfo) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/order/create`, orderInfo).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function getAllCategories() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/category/all`).then(
            (response) => {
                return resolve(response.data);
            },
            (error) => {
                return reject(error);
            }
        );
    });
}

async function search(value) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/book/query?search=${value}&quantity=0`).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

async function getBooksByCategories() {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/category/books`).then(
            (res) => resolve(res.data),
            (error) => reject(error)
        );
    });
}

async function getBooksByCategory(catId) {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `${apiUrl}/book/query?page=1&limit=10&category=${catId}&quantity=0`
            )
            .then(
                (res) => resolve(res.data),
                (error) => reject(error)
            );
    });
}
