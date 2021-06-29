import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart, removeItem } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };
  const noItemsMessage = () => (
    <h2>
      Your cart is empty. Click below <br />
      <Link to="/shop">Start shopping </Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart Page"
      description="Manage your Cart Items. You can add, remove and checkout here"
      className="container py-3"
    >
      <div className="row">
        <div className="col-lg-8 col-12">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-lg-4 col-12">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
