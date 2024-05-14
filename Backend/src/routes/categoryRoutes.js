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

export default router;
