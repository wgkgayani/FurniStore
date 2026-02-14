import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slices/authSlice";
import {
  Person,
  Envelope,
  Phone,
  GeoAlt,
  Lock,
  Camera,
  BoxSeam,
  BoxArrowRight,
} from "react-bootstrap-icons";

// UserProfile component allows users to view and edit their profile information, change password, and manage addresses
const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // Form state for profile and password updates
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view profile");
      navigate("/login");
      return;
    }

    // Pre-fill form with user data
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user, token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Simulated API calls for profile update and password change
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setLoading(false);
    }, 1000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Password changed successfully");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                <img
                  src={
                    user?.img ||
                    "https://avatar.iran.liara.run/public/boy?username=User"
                  }
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <button className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0">
                  <Camera size={16} />
                </button>
              </div>

              <h4>
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="text-muted">{user?.email}</p>

              <div className="mt-3">
                <span className="badge bg-primary">Customer</span>
                {user?.role === "admin" && (
                  <span className="badge bg-danger ms-1">Admin</span>
                )}
              </div>

              <hr />

              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action text-start ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <Person className="me-2" />
                  Personal Information
                </button>
                <button
                  className={`list-group-item list-group-item-action text-start ${activeTab === "password" ? "active" : ""}`}
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="me-2" />
                  Change Password
                </button>
                <button
                  className={`list-group-item list-group-item-action text-start ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => navigate("/orders")}
                >
                  <BoxSeam className="me-2" />
                  My Orders
                </button>
                <button
                  className={`list-group-item list-group-item-action text-start ${activeTab === "address" ? "active" : ""}`}
                >
                  <GeoAlt className="me-2" />
                  Address Book
                </button>
                <button
                  className="list-group-item list-group-item-action text-start text-danger"
                  onClick={handleLogout}
                >
                  <BoxArrowRight className="me-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          {activeTab === "profile" && (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Personal Information</h4>

                <form onSubmit={handleProfileUpdate}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        <Person className="me-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <Envelope className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled
                    />
                    <small className="text-muted">
                      Email cannot be changed
                    </small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      <Phone className="me-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="07X XXX XXXX"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Change Password</h4>

                <form onSubmit={handlePasswordChange}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <small className="text-muted">Minimum 6 characters</small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Change Password"}
                  </button>
                </form>

                <div className="alert alert-info mt-4">
                  <h6>Password Requirements:</h6>
                  <ul className="mb-0">
                    <li>Minimum 6 characters</li>
                    <li>Include letters and numbers</li>
                    <li>Avoid common passwords</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "address" && (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Address Book</h4>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <GeoAlt className="me-2" />
                    Shipping Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Enter your full address"
                  />
                </div>

                <button className="btn btn-primary">Save Address</button>

                <div className="mt-4">
                  <h6>Saved Addresses</h6>
                  <div className="card">
                    <div className="card-body">
                      <p className="mb-1">
                        {formData.address || "No address saved yet"}
                      </p>
                      <small className="text-muted">
                        Default shipping address
                      </small>
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
