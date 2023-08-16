import React from "react";
import Layout from "../Layout/Layout";
import { useSearch } from "../../Context/Search";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const[values,setvalues]=useSearch();
    const navigate =useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
           const {data}= await axios.get(`/api/v1/product/search/${values.keyword}`) 
           setvalues({...values,results:data})
           navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keywords}
          onChange={(e)=>setvalues({...values,keywords:e.target.value})}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </Layout>
  );
};

export default SearchInput;
