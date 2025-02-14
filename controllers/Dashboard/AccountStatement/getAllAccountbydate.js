const express = require('express');
const mongoose = require('mongoose');
const Deposit = require('../../../models/Deposit');
const Expense = require('../../../models/Expense');

async function getTransactions(req, res) {
  try {
    const { start_month, end_month, account, type } = req.query;

    let filter = {};

    if (start_month && end_month) {
      const startDate = new Date(`${start_month}-01T00:00:00.000Z`);
      let endDate = new Date(`${end_month}-01T00:00:00.000Z`);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);

      filter.date = { $gte: startDate, $lte: endDate };
    } else if (start_month) {
      const startDate = new Date(`${start_month}-01T00:00:00.000Z`);
      filter.date = { $gte: startDate };
    } else if (end_month) {
      const endDate = new Date(`${end_month}-01T00:00:00.000Z`);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
      filter.date = { $lte: endDate };
    }

    if (account) {
      filter.account_name = account;
    }

    let transactions = [];
    let totalIncome = {};
    let totalExpense = {};

    if (type === 'income') {
      transactions = await Deposit.find(filter);
      totalIncome = transactions.reduce((acc, transaction) => {
        acc[transaction.account_name] = (acc[transaction.account_name] || 0) + transaction.amount;
        return acc;
      }, {});
    } else if (type === 'expense') {
      transactions = await Expense.find(filter);
      totalExpense = transactions.reduce((acc, transaction) => {
        acc[transaction.account_name] = (acc[transaction.account_name] || 0) + transaction.amount;
        return acc;
      }, {});
    } else if (!type) {
      const deposits = await Deposit.find(filter);
      const expenses = await Expense.find(filter);

     
      totalIncome = deposits.reduce((acc, transaction) => {
        acc[transaction.account_name] = (acc[transaction.account_name] || 0) + transaction.amount;
        return acc;
      }, {});

      totalExpense = expenses.reduce((acc, transaction) => {
        acc[transaction.account_name] = (acc[transaction.account_name] || 0) + transaction.amount;
        return acc;
      }, {});

      transactions = [...deposits, ...expenses];
    } else {
      return res.status(400).json({
        message: 'Invalid type specified. Must be either "income" or "expense".',
      });
    }


    const accountsSummary = transactions.reduce((acc, transaction) => {
      const { account_name, amount } = transaction;
      
      if (!acc[account_name]) {
        acc[account_name] = {
          account_name,
          transactions: [],
          totalIncome: 0,
          totalExpense: 0
        };
      }

      if (transaction instanceof Deposit) {
        acc[account_name].totalIncome += amount;
      } else if (transaction instanceof Expense) {
        acc[account_name].totalExpense += amount;
      }

      acc[account_name].transactions.push(transaction);
      return acc;
    }, {});

    const result = Object.values(accountsSummary);

    res.status(200).json({
      message: 'Transactions fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while fetching transactions',
      error: error.message,
    });
  }
}

module.exports = getTransactions;
