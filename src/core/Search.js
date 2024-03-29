import React, { useState, useEffect, Fragment } from "react";

import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({ search: search || undefined, category }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <Fragment>
        <div>
          <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        </div>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </Fragment>
    );
  };
  const searchForm = () => (
    <form className="d-flex" onSubmit={searchSubmit}>
      <span className=" input-group-text mb-3">
        <div className="input-group">
          <select
            className="form-select input-group-prepend"
            id="inputGroupSelect01"
            onChange={handleChange("category")}
          >
            <option value="All">All</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="search"
            className="form-control me-0"
            onChange={handleChange("search")}
            placeholder="Search by name"
            for="inputGroupSelect01"
            aria-label="Search"
          />
        </div>

        <div className="btn input-group-append">
          <button
            className="input-group-text"
            for="inputGroupSelect01"
            type="submit"
          >
            Search
          </button>
        </div>
      </span>
    </form>
  );
  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
      <div className="container">{searchedProducts(results)}</div>
    </div>
  );
};
export default Search;
