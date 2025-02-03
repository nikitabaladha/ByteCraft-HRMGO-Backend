const PaymentType = require("../../../models/PaymentType");

async function deletePaymentType(req, res) {
  const { id } = req.params;

  try {
    const deletedPaymentType = await PaymentType.findByIdAndDelete(id);

    if (!deletedPaymentType) {
      return res.status(404).json({
        message: 'Payment Type not found',
      });
    }

    res.status(200).json({
      message: 'Payment Type deleted successfully',
      data: deletedPaymentType,
    });
  } catch (error) {
    console.error("Error deleting payment type:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the payment type',
      error: error.message,
    });
  }
}

module.exports = deletePaymentType;
