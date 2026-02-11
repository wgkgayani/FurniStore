import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HouseDoor,
  Phone,
  Envelope,
  GeoAlt,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">
              <HouseDoor className="me-2" />
              FurniStore
            </h5>
            <p className="text-light">
              Your one-stop destination for premium furniture. We bring comfort
              and style to your home.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-3">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white me-3">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white me-3">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-light text-decoration-none"
                >
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-light text-decoration-none">
                  Shopping Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" className="text-light text-decoration-none">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <GeoAlt className="me-2" />
                123 Furniture Street, City, Country
              </li>
              <li className="mb-2">
                <Phone className="me-2" />
                +94 77 123 4567
              </li>
              <li className="mb-2">
                <Envelope className="me-2" />
                support@furnistore.com
              </li>
            </ul>
            <div className="mt-3">
              <h6 className="fw-bold mb-2">Business Hours</h6>
              <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="mb-0">Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <hr className="bg-light my-4" />

        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} FurniStore. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link
              to="/privacy"
              className="text-light text-decoration-none me-3"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-light text-decoration-none">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
