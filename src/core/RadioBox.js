import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };
  return prices.map((p, i) => (
    <Fragment>
      <li key={i} className="list-unstyled">
        <input
          onChange={handleChange}
          value={`${p._id}`}
          name={p}
          type="radio"
          className="me-2 ms-4"
        />
        <label classname="form-check-label">{p.name}</label>
      </li>
    </Fragment>
  ));
};
export default RadioBox;
