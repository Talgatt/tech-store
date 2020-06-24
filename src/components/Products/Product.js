import React from "react";
import { Link } from "react-router-dom";
// impt
import PropTypes from "prop-types";
import img from "../../assets/mainBcg.jpeg";

export default function Product({ image, Title, id, Price }) {
  //const url = image.url;

  return (
    <article className="product">
      <div className="img-container">
        <img src={image || img} alt={Title || "default title"} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{Title || "default title"}</p>
        <p className="product-price">${Price || 0}</p>
      </div>
    </article>
  );
}

Product.protoTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
