async function getAll(req, res) {
  try {
    const { start_month, end_month } = req.query;

    let incomeExpenseData;

    if (start_month && end_month) {
      const startDate = new Date(start_month);
      const endDate = new Date(end_month);
      endDate.setMonth(endDate.getMonth() + 1);

      incomeExpenseData = await IncomeExpenseChart.aggregate([
        {
          $match: {
            categories: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $project: {
            _id: 0,
            categories: 1,
            incomeData: 1,
            expenseData: 1,
          },
        },
        {
          $sort: { categories: 1 },
        },
      ]);
    } else {
      incomeExpenseData = await IncomeExpenseChart.aggregate([
        {
          $sort: { categories: -1 }, // Sort by latest first
        },
        {
          $limit: 6, // Fetch the latest 6 entries
        },
        {
          $sort: { categories: 1 }, // Re-sort in ascending order
        },
        {
          $project: {
            _id: 0,
            categories: 1,
            incomeData: 1,
            expenseData: 1,
          },
        },
      ]);
    }

    if (!incomeExpenseData.length) {
      return res.status(404).json({
        hasError: true,
        message: "No data found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Income Expense Chart fetched successfully",
      data: incomeExpenseData,
    });
  } catch (error) {
    console.error("Error fetching IncomeExpenseChart data:", error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = getAll;
