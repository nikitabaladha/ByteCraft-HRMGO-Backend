const PaymentType = require("../../../models/PaymentType");

async function getAll(req, res) {
  try {
    const paymentTypes = await PaymentType.find();

    if (paymentTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Payment Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Payment Types fetched successfully",
      data: paymentTypes,
    });
  } catch (error) {
    console.error("Error fetching payment types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
