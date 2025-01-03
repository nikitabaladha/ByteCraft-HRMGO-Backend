const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      unique: true,
    },
    salaryType: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    grandTotal: { 
      type: Number,
      required: true,
    },
    status: {
      type: String,  
      default: 'unpaid',  
      enum: ["paid", "unpaid", "inactive"],
    },
    payDate: {
      type: Date, 
    },

    statusPayDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

salarySchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'paid') {
    this.statusPayDate = new Date(); 
  }
  next();
});

salarySchema.index({ employeeId: 1 }, { unique: true });



const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
