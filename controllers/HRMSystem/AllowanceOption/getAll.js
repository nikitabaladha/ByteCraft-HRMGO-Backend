const AllowanceOption = require("../../../models/AllowanceOption");

async function getAll(req, res) {
  try {
 
    const allowanceOptions = await AllowanceOption.find();

    if (allowanceOptions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Allowance Options found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Allowance Options fetched successfully",
      data: allowanceOptions,
    });
  } catch (error) {
    console.error("Error fetching allowance options:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
