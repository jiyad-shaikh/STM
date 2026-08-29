import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const getExpenses = () => {
    return API.get("/expenses");
};

export const getExpenseById = (id) => {
    return API.get(`/expenses/${id}`);
};

export const createExpense = (expense) => {
    return API.post("/expenses", expense);
};

export const updateExpense = (id, expense) => {
    return API.put(`/expenses/${id}`, expense);
};

export const deleteExpense = (id) => {
    return API.delete(`/expenses/${id}`);
};