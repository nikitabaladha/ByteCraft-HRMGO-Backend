const Award = require("../../../models/Award");

async function getAll(req, res) {
  try {
    const { limit = 10, page = 1, search = "" } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    // Create a regular expression for case-insensitive search
    const searchRegex = new RegExp(search, "i");

    // Initialize the search filter
    const searchFilter = {
      $or: [
        { "employeeId.name": searchRegex }, // Employee name search
        { awardType: searchRegex }, // Award type search
        { gift: searchRegex }, // Gift search
        { description: searchRegex }, // Description search
      ],
    };

    // Check if the search term is a valid date
    const date = new Date(search);
    if (!isNaN(date.getTime())) {
      // If the search term is a valid date, add a date range filter
      searchFilter.$or.push({
        date: {
          $gte: new Date(date.setHours(0, 0, 0, 0)), // Start of the day
          $lte: new Date(date.setHours(23, 59, 59, 999)), // End of the day
        },
      });
    }

    console.log("Search Filter:", searchFilter);

    // Query the database
    const awards = await Award.find(searchFilter)
      .populate("employeeId", "name") // Populate employeeId correctly
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const totalCount = await Award.countDocuments(searchFilter);

    const formedAwards = awards.map((award) => ({
      employeeName: award.employeeId?.name || "Unknown",
      awardType: award.awardType,
      date: award.date,
      gift: award.gift,
      description: award.description,
      id: award._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Awards retrieved successfully",
      data: {
        awards: formedAwards,
        totalCount,
      },
    });
  } catch (error) {
    console.error("Error in getAll API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = getAll;
