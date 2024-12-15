const Appraisal = require("../../../models/Appraisal");
const Indicator = require("../../../models/Indicator");
const Employee = require("../../../models/Employee");
const Branch = require("../../../models/Branch");

async function create(req, res) {
  try {
    const {
      branchId,
      employeeId,
      remarks,
      indicatorId,
      appraisalCompetencies,
    } = req.body;

    const currentDate = new Date();
    const formattedAppraisalDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    );

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const indicator = await Indicator.findById(indicatorId);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    const validateCompetencies = (competencies, validCompetencies) => {
      return competencies.every((competency) =>
        validCompetencies.includes(competency.name)
      );
    };

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

    if (
      !validateCompetencies(appraisalCompetencies.technical, [
        "Allocating Resources",
      ])
    ) {
      return res
        .status(400)
        .json({ message: "Invalid technical competencies" });
    }

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

    const overAllRating = calculateOverallRating(appraisalCompetencies);

    const appraisal = new Appraisal({
      branchId,
      employeeId,
      appraisalDate: formattedAppraisalDate,
      remarks,
      indicatorId,
      appraisalCompetencies,
      overAllRating,
    });

    const savedAppraisal = await appraisal.save();

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
