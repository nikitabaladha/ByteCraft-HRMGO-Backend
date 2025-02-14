const PaymentType = require("../../../models/PaymentType");

async function update(req, res) {
  try {
    const { paymentName } = req.body; 
    const { id } = req.params;

    const paymentType = await PaymentType.findById(id);

    if (!paymentType) {
      return res.status(404).json({ message: "Payment Type not found." });
    }

    paymentType.paymentName = paymentName || paymentType.paymentName;

    await paymentType.save();

    return res.status(200).json({
      message: "Payment Type updated successfully!",
      paymentType,
    });
  } catch (error) {
    console.error("Error updating payment type:", error);
    return res.status(500).json({
      message: "Failed to update payment type.",
      error: error.message,
    });
  }
}

module.exports = update;
