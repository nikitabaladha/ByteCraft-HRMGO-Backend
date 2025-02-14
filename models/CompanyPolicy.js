const mongoose = require('mongoose');

const CompanyPolicySchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

const CompanyPolicy = mongoose.model('CompanyPolicy', CompanyPolicySchema);

module.exports = CompanyPolicy;
