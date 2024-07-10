import httpcommon from "../../httpcommon";


const createLibrary = (data) => {
    return httpcommon.post("/api/library", data);
};

const loadLibrary = () => {
    return httpcommon.get("/api/library");
};

const deleteLibraryById = (id) => {
    return httpcommon.delete(`/api/library/${id}`);
};

const getLibrary = (id) => {
    return httpcommon.get(`/api/library/${id}`);
};

const updateLibrary = (id, data) => {
    return httpcommon.put(`/api/library/${id}`, data);
};

const getLibraryByCityId = (cityId) => {
    return httpcommon.get(`/api/library/city/${cityId}`);
};

const LibraryServices = {
    createLibrary,
    loadLibrary,
    deleteLibraryById,
    getLibrary,
    updateLibrary,
    getLibraryByCityId,
}

export default LibraryServices;