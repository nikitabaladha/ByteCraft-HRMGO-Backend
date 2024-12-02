const Award = require("../../../models/Award");

async function getAll(req, res) {
  try {
    const { limit = 10, page = 1, search = "" } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const searchRegex = new RegExp(search, "i");

    const searchFilter = {
      $or: [
        { "employeeId.name": searchRegex },
        { awardType: searchRegex },
        { gift: searchRegex },
        { description: searchRegex },
      ],
    };

    const date = new Date(search);
    if (!isNaN(date.getTime())) {
      searchFilter.$or.push({
        date: {
          $gte: new Date(date.setHours(0, 0, 0, 0)),
          $lte: new Date(date.setHours(23, 59, 59, 999)),
        },
      });
    }

    const awards = await Award.find(searchFilter)
      .populate("employeeId", "name")
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
