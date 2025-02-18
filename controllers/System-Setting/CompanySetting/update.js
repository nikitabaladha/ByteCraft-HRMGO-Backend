const CompanySettings = require("../../../models/CompanySetting");

const updateCompanySetting = async (req, res) => {
  try {
    const {
      company_name,
      company_address,
      company_city,
      company_state,
      company_zipcode,
      company_country,
      company_telephone,
      company_start_time,
      company_end_time,
      timezone,
    } = req.body;

    // Check if required fields are present
    if (
      !company_name ||
      !company_start_time ||
      !company_end_time ||
      !timezone
    ) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Find existing company settings
    let companySettings = await CompanySettings.findOne();

    if (!companySettings) {
      // If no settings exist, create new settings
      companySettings = new CompanySettings({
        company_name,
        company_address,
        company_city,
        company_state,
        company_zipcode,
        company_country,
        company_telephone,
        company_start_time,
        company_end_time,
        timezone,
      });

      await companySettings.save();
      return res.status(201).json({
        message: "Company settings created successfully.",
        data: companySettings,
      });
    }

    // If settings exist, update them
    Object.assign(companySettings, {
      company_name,
      company_address,
      company_city,
      company_state,
      company_zipcode,
      company_country,
      company_telephone,
      company_start_time,
      company_end_time,
      timezone,
    });

    const updatedSettings = await companySettings.save();

    res.status(200).json({
      message: "Company settings updated successfully.",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating company setting:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateCompanySetting;
