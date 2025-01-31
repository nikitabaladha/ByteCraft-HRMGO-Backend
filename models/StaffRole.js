const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
  },
  actions: [
    {
      type: String,
      enum: ['Manage', 'Create', 'Edit', 'Delete', 'Show', 'Move', 'Add'], // Allowed actions
    },
  ],
});

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  permissions: [PermissionSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

RoleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role; 