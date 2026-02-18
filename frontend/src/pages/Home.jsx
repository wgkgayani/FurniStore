import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Star,
} from "react-bootstrap-icons";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      // Get first 6 products as featured
      setFeaturedProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero-section py-5 mb-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Discover Premium Furniture for Your Dream Home
              </h1>
              <p className="lead mb-4">
                Transform your living space with our curated collection of
                high-quality furniture. Comfort, style, and durability in every
                piece.
              </p>
              <Link to="/products" className="btn btn-light btn-lg px-4 py-3">
                Shop Now <ArrowRight className="ms-2" />
              </Link>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Furniture"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products mb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Products</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section mb-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <Truck size={40} className="text-primary mb-3" />
                <h5>Free Shipping</h5>
                <p className="text-muted mb-0">On orders over $100</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <ShieldCheck size={40} className="text-primary mb-3" />
                <h5>2-Year Warranty</h5>
                <p className="text-muted mb-0">Quality guaranteed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <CreditCard size={40} className="text-primary mb-3" />
                <h5>Secure Payment</h5>
                <p className="text-muted mb-0">100% secure transactions</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <Star size={40} className="text-primary mb-3" />
                <h5>5-Star Support</h5>
                <p className="text-muted mb-0">24/7 customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section mb-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Shop by Category</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <Link
                to="/products?category=sofa"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Sofas"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Sofas</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=bed"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Beds"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Beds</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=table"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Tables"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Tables</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=chair"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Chairs"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Chairs</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <h2> </h2>

          <div className="row g-4">
            <div className="col-md-3">
              <Link
                to="/products?category=sofa"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Sofas"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Sofas</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=bed"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Beds"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Beds</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=table"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Tables"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Tables</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=chair"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Chairs"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Chairs</h5>
                  </div>
                </div>
              </Link>
            </div>
            <Link to="/products" className="btn btn-outline-primary">
              View All <ArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
