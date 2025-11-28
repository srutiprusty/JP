import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String, // URL to company logo
    },
    employeeCount: {
      type: Number,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
    feedbacks: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
