import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "Please login and try again",
      });
    }

    const orderInfo = req.body;

    // Generate order ID
    let orderId = "CBC00001";
    const lastOrder = await Order.findOne().sort({ date: -1 });

    if (lastOrder) {
      const lastOrderId = lastOrder.orderId;
      const lastOrderNumber = parseInt(lastOrderId.replace("CBC", ""));
      orderId = "CBC" + String(lastOrderNumber + 1).padStart(5, "0");
    }

    let total = 0;
    let labelledTotal = 0;
    const products = [];

    // Validate and calculate products
    for (const item of orderInfo.products) {
      const product = await Product.findOne({ productId: item.productId });

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.productId} not found`,
        });
      }

      if (!product.isAvailable) {
        return res.status(400).json({
          message: `Product ${item.productId} is not available`,
        });
      }

      products.push({
        productInfo: {
          productId: product.productId,
          name: product.name,
          description: product.description,
          images: product.images,
          labelledPrice: product.labelledPrice,
          price: product.price,
        },
        quantity: item.quantity,
      });

      total += product.price * item.quantity;
      labelledTotal += product.labelledPrice * item.quantity;
    }

    const order = new Order({
      orderId,
      email: req.user.email,
      name: orderInfo.name || `${req.user.firstName} ${req.user.lastName}`,
      address: orderInfo.address,
      phone: orderInfo.phone,
      products,
      labelledTotal,
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
}

export async function getUserOrders(req, res) {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "Please login to view orders",
      });
    }

    const orders = await Order.find({ email: req.user.email }).sort({
      date: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Check if user owns the order or is admin
    if (order.email !== req.user?.email && req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized to view this order",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
}
