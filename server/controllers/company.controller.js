import { Company } from "./../models/company.model.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location, employeeCount } =
      req.body;
    const file = req.file;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can't register in the same company.",
        success: false,
      });
    }
    // Check if user already has a company
    const existingCompany = await Company.findOne({ userId: req.id });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can only create one company.",
        success: false,
      });
    }
    // Cloudinary
    const updateData = {
      name: companyName,
      description,
      website,
      location,
      employeeCount,
    };
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }
    company = await Company.create({
      ...updateData,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; //params used when in server we try /jobs/:id
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, employeeCount } = req.body;
    const file = req.file;
    //cloudinary
    const updateData = { name, description, website, location, employeeCount };
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Details updated.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
