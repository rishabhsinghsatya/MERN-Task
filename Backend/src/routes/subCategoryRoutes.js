import express from "express";
import SubCategory from "../models/SubCategory.js";
import Category from "../models/Category.js";

const router = express.Router();

router.post("/categories/:categoryId/subcategories", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, image, description, taxApplicability, tax } = req.body;

    const parentCategory = await Category.findById(categoryId);
    if (!parentCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newSubCategory = new SubCategory({
      name,
      image,
      description,
      taxApplicability: taxApplicability || parentCategory.taxApplicability,
      tax: tax || parentCategory.tax,
      category: categoryId,
    });

    const savedSubCategory = await newSubCategory.save();

    res.status(201).json(savedSubCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all subcategories
router.get("/subcategories", async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all subcategories under a category
router.get("/categories/:categoryId/subcategories", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const subcategories = await SubCategory.find({ category: categoryId });
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a subcategory by name or ID
router.get("/subcategories/:identifier", async (req, res) => {
  const identifier = req.params.identifier;

  try {
    // Check if the identifier is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    let subcategory;
    if (isObjectId) {
      subcategory = await SubCategory.findById(identifier);
    } else {
      subcategory = await SubCategory.findOne({ name: identifier });
    }

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
