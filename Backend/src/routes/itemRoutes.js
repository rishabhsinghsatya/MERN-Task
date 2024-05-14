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

// GET all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all items under a category
router.get("/categories/:categoryId/items", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const items = await Item.find({ category: categoryId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all items under a sub-category
router.get("/subcategories/:subCategoryId/items", async (req, res) => {
  const subCategoryId = req.params.subCategoryId;

  try {
    const items = await Item.find({ subCategory: subCategoryId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET an item by name or ID
router.get("/items/:identifier", async (req, res) => {
  const identifier = req.params.identifier;

  try {
    // Check if the identifier is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    let item;
    if (isObjectId) {
      item = await Item.findById(identifier);
    } else {
      item = await Item.findOne({ name: identifier });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
