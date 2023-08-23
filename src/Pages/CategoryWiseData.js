import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,navigate, useNavigate } from "react-router-dom";
const CategoryWiseData = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate=useNavigate()

  useEffect(()=>{
   if(params?.slug) getProductbyCat()
      },[params?.slug])

  const getProductbyCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      console.log(data);
      setProducts(data?.products);
      console.log(products);
      
      setCategory(data?.category);
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <Layout>
      <div className="container">
        <h1>Category {category?.name}</h1>
        <h1>{products?.length} results found</h1>
      </div>
      <div className="row">
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
                  <button className="btn btn-primary" onClick={()=>navigate(`/product/${p.slug}`)}>More details</button>
                  <button className="btn btn-secondary">Add to acrt</button>
                </div>
              </div>
            ))}
            </div>

      </div>
    </Layout>
  );
};

export default CategoryWiseData;
