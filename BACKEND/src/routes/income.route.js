const express = require("express");

const {
    getIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome
} = require("../controllers/income.controller");

const router = express.Router();

router.get("/", getIncomes);

router.get("/:id", getIncomeById);

router.post("/", createIncome);

router.put("/:id", updateIncome);

router.delete("/:id", deleteIncome);

module.exports = router;