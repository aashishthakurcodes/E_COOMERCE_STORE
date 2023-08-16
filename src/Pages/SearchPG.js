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
        </div>
      </div>
    </Layout>
  );
};

export default SearchPG;
