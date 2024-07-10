import httpcommon from "../../httpcommon";


const createCity = (data) => {
    return httpcommon.post("/api/city", data);
};

const loadCity = () => {
    return httpcommon.get("api/city");
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