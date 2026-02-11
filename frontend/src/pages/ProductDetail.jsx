import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { productAPI } from "../services/api";
import { addToCart } from "../redux/slices/cartSlice";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Star,
  StarFill,
  StarHalf,
  CheckCircle,
  Clock,
  BoxSeam,
  ChevronLeft,
  ChevronRight,
  Plus,
  Dash,
} from "react-bootstrap-icons";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Product not found");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await productAPI.getAll();
      // Filter to get related products (simplified - in real app, use categories)
      const filtered = response.data
        .filter((p) => p.productId !== id)
        .slice(0, 4);
      setRelatedProducts(filtered);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleAddToCart = () => {
    if (!product || !product.isAvailable) {
      toast.error("Product is not available");
      return;
    }

    dispatch(
      addToCart({
        productId: product.productId,
        name: product.name,
        price: product.price,
        labelledPrice: product.labelledPrice,
        image: product.images?.[0] || "",
        quantity: parseInt(quantity),
      }),
    );

    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="text-warning" />);
      } else {
        stars.push(<Star key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  const calculateDiscount = () => {
    if (product.labelledPrice > product.price) {
      return Math.round(
        ((product.labelledPrice - product.price) / product.labelledPrice) * 100,
      );
    }
    return 0;
  };

  const getStockStatus = () => {
    if (!product.isAvailable) {
      return {
        text: "Out of Stock",
        color: "danger",
        icon: <Clock className="me-1" />,
      };
    }
    if (product.stock <= 5) {
      return {
        text: `Only ${product.stock} left!`,
        color: "warning",
        icon: <BoxSeam className="me-1" />,
      };
    }
    return {
      text: "In Stock",
      color: "success",
      icon: <CheckCircle className="me-1" />,
    };
  };

  const discount = calculateDiscount();
  const stockStatus = getStockStatus();

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="me-2" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </li>
          <li className="breadcrumb-item">
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate("/products")}
            >
              Products
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-body p-0">
              {/* Main Image */}
              <div className="position-relative">
                {discount > 0 && (
                  <div
                    className="badge bg-danger position-absolute"
                    style={{ top: "15px", left: "15px", fontSize: "1rem" }}
                  >
                    -{discount}% OFF
                  </div>
                )}
                <img
                  src={
                    product.images?.[selectedImage] ||
                    "https://via.placeholder.com/600x600?text=No+Image"
                  }
                  alt={product.name}
                  className="img-fluid rounded-top"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="d-flex p-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      className={`btn btn-outline-secondary me-2 p-0 ${selectedImage === index ? "border-primary" : ""}`}
                      onClick={() => setSelectedImage(index)}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">{renderStars(4.5)}</div>
                <span className="text-muted">(24 reviews)</span>
                <span className="ms-3">
                  <span className={`badge bg-${stockStatus.color}`}>
                    {stockStatus.icon}
                    {stockStatus.text}
                  </span>
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                {discount > 0 ? (
                  <>
                    <h2 className="text-primary mb-0">
                      ${product.price.toFixed(2)}
                    </h2>
                    <div className="d-flex align-items-center">
                      <span className="text-muted text-decoration-line-through me-2">
                        ${product.labelledPrice.toFixed(2)}
                      </span>
                      <span className="badge bg-success">
                        Save $
                        {(product.labelledPrice - product.price).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <h2 className="text-primary mb-0">
                    ${product.price.toFixed(2)}
                  </h2>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              {/* Features */}
              {product.altNames && product.altNames.length > 0 && (
                <div className="mb-4">
                  <h5>Also Known As</h5>
                  <div className="d-flex flex-wrap">
                    {product.altNames.map((name, index) => (
                      <span
                        key={index}
                        className="badge bg-light text-dark me-2 mb-2"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4">
                <h5>Quantity</h5>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Dash />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center mx-2"
                    style={{ width: "80px" }}
                    value={quantity}
                    min="1"
                    max={product.stock || 10}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= (product.stock || 10)) {
                        setQuantity(val);
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <Plus />
                  </button>
                  <span className="ms-3 text-muted">
                    {product.stock || 10} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-3 mb-4">
                <button
                  className="btn btn-primary btn-lg py-3"
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>

                <button
                  className="btn btn-outline-primary btn-lg py-3"
                  onClick={handleBuyNow}
                  disabled={!product.isAvailable}
                >
                  Buy Now
                </button>
              </div>

              {/* Product Features */}
              <div className="row text-center mb-4">
                <div className="col-4">
                  <Truck size={24} className="text-primary mb-2" />
                  <small className="d-block">Free Shipping</small>
                  <small className="text-muted">Over $100</small>
                </div>
                <div className="col-4">
                  <ShieldCheck size={24} className="text-primary mb-2" />
                  <small className="d-block">2-Year Warranty</small>
                  <small className="text-muted">Quality Guaranteed</small>
                </div>
                <div className="col-4">
                  <BoxSeam size={24} className="text-primary mb-2" />
                  <small className="d-block">Easy Returns</small>
                  <small className="text-muted">30 Days</small>
                </div>
              </div>

              {/* Share */}
              <div className="border-top pt-3">
                <small className="text-muted">Share this product:</small>
                <div className="d-flex mt-2">
                  <button className="btn btn-outline-secondary btn-sm me-2">
                    Facebook
                  </button>
                  <button className="btn btn-outline-secondary btn-sm me-2">
                    Twitter
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#details"
                    type="button"
                    role="tab"
                  >
                    Product Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="specs-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#specs"
                    type="button"
                    role="tab"
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="reviews-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#reviews"
                    type="button"
                    role="tab"
                  >
                    Reviews (24)
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="shipping-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#shipping"
                    type="button"
                    role="tab"
                  >
                    Shipping & Returns
                  </button>
                </li>
              </ul>

              <div className="tab-content p-3" id="productTabsContent">
                <div
                  className="tab-pane fade show active"
                  id="details"
                  role="tabpanel"
                >
                  <h5>Detailed Description</h5>
                  <p>{product.description}</p>
                  <p>
                    This premium furniture piece combines modern design with
                    exceptional comfort. Crafted from high-quality materials,
                    it's built to last and designed to enhance your living
                    space.
                  </p>
                </div>

                <div className="tab-pane fade" id="specs" role="tabpanel">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Material</th>
                        <td>Premium Wood & Leather</td>
                      </tr>
                      <tr>
                        <th>Color</th>
                        <td>Brown/Beige</td>
                      </tr>
                      <tr>
                        <th>Dimensions</th>
                        <td>85"W x 38"D x 32"H</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>150 lbs</td>
                      </tr>
                      <tr>
                        <th>Assembly</th>
                        <td>Required (tools included)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <h5>Customer Reviews</h5>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-3">4.5 out of 5</strong>
                      {renderStars(4.5)}
                    </div>
                    <p className="text-muted">Based on 24 reviews</p>
                  </div>

                  <div className="review">
                    <div className="d-flex justify-content-between mb-2">
                      <strong>John D.</strong>
                      <small className="text-muted">2 weeks ago</small>
                    </div>
                    <div className="mb-2">{renderStars(5)}</div>
                    <p>
                      "Excellent quality! Very comfortable and looks great in my
                      living room."
                    </p>
                  </div>
                </div>

                <div className="tab-pane fade" id="shipping" role="tabpanel">
                  <h5>Shipping Information</h5>
                  <ul>
                    <li>Free shipping on orders over $100</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery available</li>
                    <li>International shipping available</li>
                  </ul>

                  <h5 className="mt-4">Return Policy</h5>
                  <ul>
                    <li>30-day return policy</li>
                    <li>Free returns for defective items</li>
                    <li>Items must be in original condition</li>
                    <li>Refund processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">You May Also Like</h3>
            <div className="row">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img
                      src={
                        relatedProduct.images?.[0] ||
                        "https://via.placeholder.com/300x200"
                      }
                      className="card-img-top"
                      alt={relatedProduct.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{relatedProduct.name}</h6>
                      <p className="card-text text-primary fw-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                      <button
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() =>
                          navigate(`/product/${relatedProduct.productId}`)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="me-2" />
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
