import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api"
});

export const getIncomes = () => {
    return API.get("/incomes");
};

export const createIncome = (income) => {
    return API.post("/incomes", income);
};

export const updateIncome = (id, income) => {
    return API.put(`/incomes/${id}`, income);
};

export const deleteIncome = (id) => {
    return API.delete(`/incomes/${id}`);
};