import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context/Search";

const SearchPG = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search REsult"}>
      <div>
        <div>
            <h1>Search Result</h1>
            <h5>{values?.results.length <1?"No result Found": `Found ${values?.results.length}`}</h5>
            <div>
            {values?.results?.map((p) => (
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
      </div>
    </Layout>
  );
};

export default SearchPG;
