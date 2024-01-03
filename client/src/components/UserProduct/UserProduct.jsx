import React, { useState } from "react";
import "./UserProduct.css";
import ProductCard from "../ProductCard/ProductCard";
import ProductDetails from "../Product/ProductDetails/ProductDetails";

const UserProduct = ({
  product,
  setFormData,
  setShowProductsPage,
  bidPageNotification,
}) => {
  return (
    <>
      <ProductCard
        product={product}
        setFormData={setFormData}
        setShowProductsPage={setShowProductsPage}
        bidPageNotification={bidPageNotification}
      />
    </>
  );
};

export default UserProduct;
