const EmailNotificationSetting = require('../../../models/EmailNotificationSetting');

const saveOrUpdateSettings = async (req, res) => {
  const {
    newUser,
    newEmployee,
    newPayroll,
    newTicket,
    newAward,
    employeeTransfer,
    employeeResignation,
    employeeTrip,
    employeePromotion,
    employeeComplaints,
    employeeWarning,
    employeeTermination,
    leaveStatus,
    contract,
  } = req.body;

  try {
    const settings = await EmailNotificationSetting.findOneAndUpdate(
      {}, 
      {
        newUser,
        newEmployee,
        newPayroll,
        newTicket,
        newAward,
        employeeTransfer,
        employeeResignation,
        employeeTrip,
        employeePromotion,
        employeeComplaints,
        employeeWarning,
        employeeTermination,
        leaveStatus,
        contract,
      },
      {
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true, 
      }
    );

    res.status(200).json({
      success: true,
      message: 'Settings saved or updated successfully',
      data: settings,
    });
  } catch (error) {
    console.error('Error saving or updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save or update settings',
      error: error.message,
    });
  }
};

module.exports = saveOrUpdateSettings