import httpcommon from "../../httpcommon";


const createBook = (data) => {
    return httpcommon.post("/api/book/save", data);
};

const createIssueBook = (data) => {
    return httpcommon.post("/api/book/issue", data);
};

const deleteBookById = (id) => {
    return httpcommon.delete(`/api/book/${id}`);
};

const getBooks = (id) => {
    return httpcommon.get(`/api/book/${id}`);
};

const updateBook = (id, data) => {
    return httpcommon.put(`/api/book/${id}`, data);
};

const getBooksByFilter = (cityId, libraryId) => {
    return httpcommon.get(`/api/book/filter?cityId=${cityId}&libraryId=${libraryId}`);
};

const BookServices = {
    createBook,
    createIssueBook,
    deleteBookById,
    getBooks,
    updateBook,
    getBooksByFilter,
}

export default BookServices;