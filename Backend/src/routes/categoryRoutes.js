import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.post("/categories", async (req, res) => {
  try {
    const { name, image, description, taxApplicability, tax, taxType } =
      req.body;

    const newCategory = new Category({
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a category by name or ID
router.get("/categories/:identifier", async (req, res) => {
  const identifier = req.params.identifier;

  try {
    // Check if the identifier is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    let category;
    if (isObjectId) {
      category = await Category.findById(identifier);
    } else {
      category = await Category.findOne({ name: identifier });
    }

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
