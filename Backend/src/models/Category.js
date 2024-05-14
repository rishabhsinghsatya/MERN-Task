import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taxApplicability: {
    type: Boolean,
    required: true,
  },
  tax: {
    type: Number,
    required() {
      return this.taxApplicability;
    },
  },
  taxType: {
    type: String,
    required() {
      return this.taxApplicability;
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
