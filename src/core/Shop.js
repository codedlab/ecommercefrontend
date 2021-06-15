import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import Card from "./card";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="Shop Search and Filter"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4 form-check">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>

        <div className="col-8">right sidebar</div>
      </div>
    </Layout>
  );
};

export default Shop;
