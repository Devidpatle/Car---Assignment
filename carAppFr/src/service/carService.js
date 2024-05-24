import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cars';

const getAllCars = () => {
    return axios.get(`${API_URL}/getAllCars`);
};

const getCarById = (id) => {
    return axios.get(`${API_URL}/getCarById/${id}`);
};

const addNewCar = (carData) => {
    return axios.post(`${API_URL}/createCar`, carData);
};

const updateCar = (id, carData) => {
    return axios.put(`${API_URL}/updateCar/${id}`, carData);
};

const deleteCar = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export { getAllCars, getCarById, addNewCar, updateCar, deleteCar };
