const Appraisal = require("../../../models/Appraisal");
const Indicator = require("../../../models/Indicator");
const Employee = require("../../../models/Employee");
const Branch = require("../../../models/Branch"); // Assuming Branch model exists

async function create(req, res) {
  try {
    // Destructure the data from the request body
    const {
      branchId,
      employeeId,
      appraisalDate,
      remarks,
      indicatorId,
      appraisalCompetencies,
    } = req.body;

    // Validate if the branchId exists in the Branch collection
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Validate if the employeeId exists in the Employee collection
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Validate if the indicatorId exists in the Indicator collection
    const indicator = await Indicator.findById(indicatorId);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    // Function to validate competencies
    const validateCompetencies = (competencies, validCompetencies) => {
      return competencies.every((competency) =>
        validCompetencies.includes(competency.name)
      );
    };

    // Check the organizational competencies
    if (
      !validateCompetencies(appraisalCompetencies.organizational, [
        "Leadership",
        "Project Management",
      ])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid organizational competencies" });
    }

    // Check the technical competencies
    if (
      !validateCompetencies(appraisalCompetencies.technical, [
        "Allocating Resources",
      ])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid technical competencies" });
    }

    // Check the behavioural competencies
    if (
      !validateCompetencies(appraisalCompetencies.behavioural, [
        "Business Process",
        "Oral Communication",
      ])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid behavioural competencies" });
    }

    // Function to calculate the overall rating for the appraisal
    const calculateOverallRating = (competencies) => {
      let totalRating = 0;
      let totalCompetencies = 0;

      // Sum all ratings in organizational, technical, and behavioural categories
      ["organizational", "technical", "behavioural"].forEach((category) => {
        competencies[category].forEach((competency) => {
          totalRating += competency.rating;
          totalCompetencies += 1;
        });
      });

      // Calculate the overall rating by dividing total rating by number of competencies
      return totalCompetencies > 0 ? totalRating / totalCompetencies : 0;
    };

    // Calculate the overall rating from the provided competencies
    const overAllRating = calculateOverallRating(appraisalCompetencies);

    // Create a new Appraisal object with the provided data and calculated overall rating
    const appraisal = new Appraisal({
      branchId,
      employeeId,
      appraisalDate,
      remarks,
      indicatorId,
      appraisalCompetencies,
      overAllRating,
    });

    // Save the Appraisal document to the database
    const savedAppraisal = await appraisal.save();

    // Return the saved appraisal object in the response
    res.status(200).json({
      message: "Appraisal created successfully",
      data: savedAppraisal,
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = create;
