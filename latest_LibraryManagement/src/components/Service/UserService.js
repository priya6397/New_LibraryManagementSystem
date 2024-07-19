import httpcommon from "../../httpcommon";


const createUser = (data) => {
    return httpcommon.post("/api/users/save", data);
};

const getUserIssuedBooks = (id) => {
    return httpcommon.get(`/api/users/user/${id}`);
};

const returnBook = (id) => {
    return httpcommon.post(`/api/book/return/${id}`);
};

const deleteUserById = (id) => {
    return httpcommon.delete(`/api/users/${id}`);
};

const getUser = (id) => {
    return httpcommon.get(`/api/users/${id}`);
};

const loadUsers = () => {
    return httpcommon.get("api/users/getAll");
};

const updateUser = (id, data) => {
    return httpcommon.put(`/api/users/${id}`, data);
};

const getPaginationWithSearch = (params) => {
    return httpcommon.get(`/api/users/pagination`, {params});
};

const UserServices = {
    createUser,
    getUserIssuedBooks,
    loadUsers,
    returnBook,
    deleteUserById,
    getUser,
    updateUser,
    getPaginationWithSearch,
}

export default UserServices;