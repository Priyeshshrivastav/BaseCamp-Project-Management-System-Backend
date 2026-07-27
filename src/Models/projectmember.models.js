const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { AvailableUserRole, UserRolesEnum } = require("../utils/constants");

const projectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true }
);

const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema
);

module.exports = ProjectMember;
module.exports.ProjectMember = ProjectMember;

