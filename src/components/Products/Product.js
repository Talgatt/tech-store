import React from "react";
import { Link } from "react-router-dom";

export default function Product({ image, Title, id, Price }) {
  //const url = image.url;

  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={Title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{Title}</p>
        <p className="product-title">{Price}</p>
      </div>
    </article>
  );
}
