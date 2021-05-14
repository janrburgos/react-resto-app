import "./CartContainer.css";
import CartItem from "../CartItem/CartItem";
import { connect } from "react-redux";

const CartContainer = ({ cart }) => {
  let totalPrice = 0;
  if (cart.length >= 1) {
    totalPrice = cart
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b);
  }

  return (
    <div className="CartContainer">
      <div className="cart-title">Your Cart</div>
      {cart.length === 0 && <p className="empty-message">Your cart is empty</p>}

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={`cart-item-${item.id}`} item={item} />
        ))}
      </div>

      {cart.length !== 0 && (
        <p className="total-message">
          Total: Php <span>{totalPrice}.00</span>
        </p>
      )}
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(CartContainer);
