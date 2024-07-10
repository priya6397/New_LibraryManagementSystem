import httpcommon from "../../httpcommon";


const createBook = (data) => {
    return httpcommon.post("/api/book", data);
};

const createIssueBook = (data) => {
    return httpcommon.post("/api/book/issue", data);
};

const deleteBookById = (id) => {
    return httpcommon.delete(`/api/book/${id}`);
};

// const loadBooks = () => {
//     return httpcommon.get("api/book");
// };

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
    // loadBooks,
    getBooks,
    updateBook,
    getBooksByFilter,
}

export default BookServices;