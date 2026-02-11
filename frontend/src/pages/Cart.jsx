import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import {
  Trash,
  Plus,
  Dash,
  ArrowLeft,
  Cart as CartIcon,
} from "react-bootstrap-icons";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { token } = useSelector((state) => state.auth);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
      toast.info("Item removed from cart");
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please login to checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <CartIcon size={80} className="text-muted mb-4" />
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">
            Add some furniture to your cart and they will appear here.
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft className="me-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item mb-3">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/100x100?text=Product"
                    }
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-4">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="text-muted small mb-0">
                    Product ID: {item.productId}
                  </p>
                </div>

                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      <Dash />
                    </button>

                    <span className="mx-3">{item.quantity}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </button>
                  </div>
                </div>

                <div className="col-md-2">
                  <h5 className="mb-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h5>
                  <small className="text-muted">
                    ${item.price.toFixed(2)} each
                  </small>
                </div>

                <div className="col-md-1">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              <ArrowLeft className="me-2" />
              Continue Shopping
            </Link>

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                dispatch(clearCart());
                toast.info("Cart cleared");
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>${calculateTotal() > 100 ? "0.00" : "10.00"}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5>Total</h5>
                <h5 className="text-primary">
                  $
                  {(
                    calculateTotal() +
                    (calculateTotal() > 100 ? 0 : 10) +
                    calculateTotal() * 0.08
                  ).toFixed(2)}
                </h5>
              </div>

              <button
                className="btn btn-primary w-100 py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <p className="text-muted small text-center mt-3">
                {calculateTotal() < 100 && (
                  <>
                    <span className="text-danger">
                      Add ${(100 - calculateTotal()).toFixed(2)} more
                    </span>{" "}
                    for free shipping!
                  </>
                )}
                {calculateTotal() >= 100 && (
                  <span className="text-success">
                    🎉 You qualify for free shipping!
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-title">Need Help?</h6>
              <p className="card-text small">
                <strong>Call us:</strong> +94 77 123 4567
                <br />
                <strong>Email:</strong> support@furnistore.com
                <br />
                <strong>Hours:</strong> Mon-Fri 9AM-6PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
