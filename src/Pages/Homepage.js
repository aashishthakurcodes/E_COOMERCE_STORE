import React from "react";
import Layout from "../Components/Layout/Layout";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../Components/Price";

const Homepage = () => {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  //page
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //Get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  // get All Product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct(data.products); // Make sure the API response structure matches
      toast.success("Getting all product");
    } catch (error) {
      setLoading(false);
      console.error("Error in getting all product:", error);
      toast.error("Error in getting all product");
    }
  };

  //Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []); 

 

  //Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Filter Category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Get Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Product"}>
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* //Filter By price */}

        <div className="col-md-3">
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reset filter
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            <h1>Products</h1>
            <div className="hmpage_conatiner">
            {console.log(products)}
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 10)}</p>
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary">More details</button>
                  <button className="btn btn-secondary">Add to acrt</button>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage; 