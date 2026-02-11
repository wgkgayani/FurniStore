import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/slices/cartSlice";
import { Star, StarFill, Cart } from "react-bootstrap-icons";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.productId,
        name: product.name,
        price: product.price,
        labelledPrice: product.labelledPrice,
        image: product.images?.[0] || "",
        quantity: 1,
      }),
    );
    toast.success("Added to cart!");
  };

  const calculateDiscount = () => {
    if (product.labelledPrice > product.price) {
      return Math.round(
        ((product.labelledPrice - product.price) / product.labelledPrice) * 100,
      );
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="card product-card">
      {discount > 0 && (
        <div
          className="badge bg-danger position-absolute"
          style={{ top: "10px", right: "10px" }}
        >
          -{discount}%
        </div>
      )}
      {!product.isAvailable && (
        <div
          className="badge bg-secondary position-absolute"
          style={{ top: "10px", left: "10px" }}
        >
          Out of Stock
        </div>
      )}

      <Link to={`/product/${product.productId}`}>
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          className="card-img-top"
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link
            to={`/product/${product.productId}`}
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </h5>

        <p className="card-text text-muted small" style={{ flex: 1 }}>
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </p>

        <div className="d-flex align-items-center mb-2">
          <div className="text-warning me-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= 4 ? <StarFill size={12} /> : <Star size={12} />}
              </span>
            ))}
          </div>
          <small className="text-muted">(24 reviews)</small>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <h5 className="text-primary mb-0">${product.price.toFixed(2)}</h5>
            {discount > 0 && (
              <small className="text-muted text-decoration-line-through">
                ${product.labelledPrice.toFixed(2)}
              </small>
            )}
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
          >
            <Cart size={16} />
          </button>
        </div>

        <Link
          to={`/product/${product.productId}`}
          className="btn btn-outline-primary btn-sm mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
