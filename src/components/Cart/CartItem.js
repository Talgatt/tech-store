import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { CartContext } from "../../context/cart";

export default function CartItem({ id, image, Title, Price, amount }) {
  // cart context

  const { removeItem, increaseAmount, decreaseAmount } = React.useContext(
    CartContext
  );

  return (
    <article className="cart-item">
      <img src={image} alt={Title} />
      <div>
        <h4>{Title}</h4>
        <h5>${Price}</h5>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            removeItem(id);
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            increaseAmount(id);
          }}
        >
          <FaAngleUp />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            decreaseAmount(id, amount);
          }}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
}
