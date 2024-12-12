const Indicator = require("../../../models/Indicator");
const User = require("../../../models/User");
const Branch = require("../../../models/Branch");
const Department = require("../../../models/Department");
const Designation = require("../../../models/Designation");

async function create(req, res) {
  try {
    const { branchId, departmentId, designationId, addedById, competencies } =
      req.body;

    const user = await User.findById(addedById);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const designation = await Designation.findById(designationId);
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    const validateCompetencies = (competencies, validCompetencies) => {
      return competencies.every((competency) =>
        validCompetencies.includes(competency.name)
      );
    };

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

    if (
      !validateCompetencies(competencies.technical, ["Allocating Resources"])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid technical competencies" });
    }

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

    const calculateOverallRating = (competencies) => {
      let totalRating = 0;
      let totalCompetencies = 0;

      ["organizational", "technical", "behavioural"].forEach((category) => {
        competencies[category].forEach((competency) => {
          totalRating += competency.rating;
          totalCompetencies += 1;
        });
      });

      return totalCompetencies > 0 ? totalRating / totalCompetencies : 0;
    };

    const overAllRating = calculateOverallRating(competencies);

    const indicator = new Indicator({
      branchId,
      departmentId,
      designationId,
      addedById,
      competencies,
      overAllRating,
    });

    const savedIndicator = await indicator.save();

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
