const Indicator = require("../../../models/Indicator");
const User = require("../../../models/User");
const Branch = require("../../../models/Branch"); // Assuming Branch model exists
const Department = require("../../../models/Department"); // Assuming Department model exists
const Designation = require("../../../models/Designation"); // Assuming Designation model exists

async function create(req, res) {
  try {
    // Destructure the data from the request body
    const { branchId, departmentId, designationId, addedById, competencies } =
      req.body;

    // Validate if the addedById exists in the User collection
    const user = await User.findById(addedById);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate if the branchId exists in the Branch collection
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Validate if the departmentId exists in the Department collection
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Validate if the designationId exists in the Designation collection
    const designation = await Designation.findById(designationId);
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    // Function to validate competencies
    const validateCompetencies = (competencies, validCompetencies) => {
      return competencies.every((competency) =>
        validCompetencies.includes(competency.name)
      );
    };

    // Check the organizational competencies
    if (
      !validateCompetencies(competencies.organizational, [
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
      !validateCompetencies(competencies.technical, ["Allocating Resources"])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid technical competencies" });
    }

    // Check the behavioural competencies
    if (
      !validateCompetencies(competencies.behavioural, [
        "Business Process",
        "Oral Communication",
      ])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid behavioural competencies" });
    }

    // Function to calculate the overall rating
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
    const overAllRating = calculateOverallRating(competencies);

    // Create a new Indicator object with the provided data and calculated overall rating
    const indicator = new Indicator({
      branchId,
      departmentId,
      designationId,
      addedById,
      competencies,
      overAllRating,
    });

    // Save the Indicator document to the database
    const savedIndicator = await indicator.save();

    // Return the saved indicator object in the response
    res.status(200).json({
      message: "Indicator created successfully",
      data: savedIndicator,
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = create;
