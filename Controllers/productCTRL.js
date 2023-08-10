import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from "fs";

//POST METHOD
export const productCTRL = async (req, res) => {
  try {
    const { name, price, slug, description, quantity, category, shipping } =
      req.fields;

    const { photo } = req.files;

    //Valiadation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "NameRequired",
        });

      case !description:
        return res.status(500).send({
          error: "description is required",
        });

      case !price:
        return res.status(500).send({
          error: "price is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is also required",
        });

      case !category:
        return res.status(500).send({
          error: "category is also required",
        });

      case photo && photo.size > 100000:
        return res.status(500).send({
          error: "Photo is also required and should be less than 1 mb",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//Get all
export const getProductctrl = async (req, res) => {
  try {
    //getting only 12 products and make anither  api for photos and show only 12 products at a time
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      total: product.length,
      success: true,
      message: "Getting All product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all product",
      error,
    });
  }
};

export const getSingleCTRL = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      total: product.length,
      success: true,
      message: "Successfully getting single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a single product",
      error,
    });
  }
};

export const productPhotoCTRL = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting a Product Image",
      error,
    });
  }
};

export const deletePrdctCTRL = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(201).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Delete",
      error,
    });
  }
};

export const updateCTRL = async (req, res) => {
  try {
    const { name, price, slug, description, quantity, category, shipping } =
      req.fields;

    const { photo } = req.files;

    //Valiadation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "NameRequired",
        });

      case !description:
        return res.status(500).send({
          error: "description is required",
        });

      case !price:
        return res.status(500).send({
          error: "price is required",
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is also required",
        });

      case !category:
        return res.status(500).send({
          error: "category is also required",
        });

      case photo && photo.size > 100000:
        return res.status(500).send({
          error: "Photo is also required and should be less than 1 mb",
        });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Update",
      error,
    });
  }
};

// Filter Product
export const prdctFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product Filter",
      error,
    });
  }
};

// Product count controller(
export const productCountCTRL = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};
//product list based on page
export const productListCTRL = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip(page - 1 + perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
      res.status(200).send({
        success:true,
        products,
      })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count page",
      error,
      success: false,
    });
  }
};
