import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Badge } from "react-bootstrap";
import {
  Cart,
  Person,
  BoxArrowRight,
  BoxArrowLeft,
  PersonAdd,
} from "react-bootstrap-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-primary">Furni</span>Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                My Orders
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative me-3"
            >
              <Cart className="me-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            {token ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="userMenuDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Person className="me-2" />
                  {user?.firstName || "User"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenuDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <Person className="me-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-item text-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <BoxArrowRight className="me-2" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  <BoxArrowLeft className="me-2" />
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <PersonAdd className="me-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
