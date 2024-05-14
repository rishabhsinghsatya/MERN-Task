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

export default router;
