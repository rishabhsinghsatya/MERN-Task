import express from "express";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Item from "../models/Item.js";

const router = express.Router();

router.post("/items", async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      category,
      subCategory,
    } = req.body;

    if (!category && !subCategory) {
      return res
        .status(400)
        .json({ message: "Either category or subcategory is required" });
    }

    let parent;
    if (category) {
      parent = await Category.findById(category);
    } else {
      parent = await SubCategory.findById(subCategory);
    }

    if (!parent) {
      return res
        .status(404)
        .json({ message: "Parent category or subcategory not found" });
    }

    const totalAmount = baseAmount - discount;

    const newItem = new Item({
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      category,
      subCategory,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
