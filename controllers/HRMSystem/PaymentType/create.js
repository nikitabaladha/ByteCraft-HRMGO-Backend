const PaymentType = require("../../../models/PaymentType");

async function create(req, res) {
  try {
    const { paymentName } = req.body;

    if (!paymentName) {
      return res.status(400).json({ message: "Payment Type Name is required." });
    }

    const newPaymentType = new PaymentType({
      paymentName,
    });

    await newPaymentType.save();

    return res.status(201).json({
      message: "Payment Type created successfully!",
      paymentType: newPaymentType,
    });
  } catch (error) {
    console.error("Error creating payment type:", error);
    return res.status(500).json({
      message: "Failed to create payment type.",
      error: error.message,
    });
  }
}

module.exports = create;
