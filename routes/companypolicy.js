const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const { createCompanyPolicy, 
    getAllCompanyPolicies,
    deleteCompanyPolicy,
    updateCompanyPolicy

} = require("../controllers/CompanyPolicy");

router.post("/createcompany_policy", Middleware, createCompanyPolicy);
router.get("/getallcompany_policy", Middleware, getAllCompanyPolicies);
router.delete("/deletecompany_policy/:id",Middleware,deleteCompanyPolicy);
router.put("/updatecompany_policy/:policyId",Middleware,updateCompanyPolicy);

module.exports = router;
