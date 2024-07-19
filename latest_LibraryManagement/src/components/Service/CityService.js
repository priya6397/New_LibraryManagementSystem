import httpcommon from "../../httpcommon";


const createCity = (data) => {
    return httpcommon.post("/api/city/save", data);
};

const loadCity = () => {
    return httpcommon.get("api/city/getAll");
};

const deleteCityById = (id) => {
    return httpcommon.delete(`/api/city/${id}`);
};

const CityServices = {
    createCity,
    loadCity,
    deleteCityById,
}


export default CityServices;