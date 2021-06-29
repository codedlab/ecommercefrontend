import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <Layout title="Home Page" description="Node React E-commerce App">
      <div className=" container py-3">
        <Search />
        <h2 className="mb-4 text-center">New Arrivals</h2>
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          {productsByArrival.map((product, i) => (
            <div key={i} className="card-deck mb-3 text-center">
              <Card product={product} />
            </div>
          ))}
        </div>
        <h2 className="mb-4 text-center">Best Sellers</h2>
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          {productsBySell.map((product, i) => (
            <div key={i} className="card-deck mb-3 text-center">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
