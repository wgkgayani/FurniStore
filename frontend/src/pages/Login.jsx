import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import {
  Lock,
  Envelope,
  Eye,
  EyeSlash,
  Facebook,
  Google,
} from "react-bootstrap-icons";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Get redirect path or default to home
  const from = location.state?.from?.pathname || "/";

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await dispatch(login(formData));

    if (!result.error) {
      toast.success("Login successful!");
      navigate(from);
    }
  };

  const handleDemoLogin = (role) => {
    let demoCredentials = {};

    if (role === "admin") {
      demoCredentials = {
        email: "admin@furnistore.com",
        password: "admin123",
      };
    } else {
      demoCredentials = {
        email: "customer@furnistore.com",
        password: "customer123",
      };
    }

    setFormData({
      ...formData,
      email: demoCredentials.email,
      password: demoCredentials.password,
    });

    toast.info(`Demo ${role} credentials filled`);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="row mb-4">
                <div className="col-md-6 mb-2">
                  <button className="btn btn-outline-primary w-100 py-2">
                    <Google className="me-2" />
                    Sign in with Google
                  </button>
                </div>
                <div className="col-md-6 mb-2">
                  <button className="btn btn-outline-primary w-100 py-2">
                    <Facebook className="me-2" />
                    Sign in with Facebook
                  </button>
                </div>
              </div>

              <div className="text-center mb-4">
                <span className="text-muted">Or sign in with email</span>
              </div>

              <form onSubmit={handleSubmit}>
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
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <Lock className="me-2" />
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center mb-4">
                  <p className="text-muted mb-0">Don't have an account?</p>
                  <Link
                    to="/register"
                    className="text-decoration-none fw-medium"
                  >
                    Create an account
                  </Link>
                </div>

                {/* Demo Login Buttons */}
                <div className="mb-4">
                  <p className="text-center text-muted mb-2">
                    Quick Demo Login:
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-info flex-fill"
                      onClick={() => handleDemoLogin("customer")}
                    >
                      Customer Demo
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-warning flex-fill"
                      onClick={() => handleDemoLogin("admin")}
                    >
                      Admin Demo
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-muted small">
                    By signing in, you agree to our{" "}
                    <Link to="/terms" className="text-decoration-none">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-decoration-none">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </form>

              {/* Security Info */}
              <div className="mt-4 pt-4 border-top">
                <h6 className="text-center mb-3">Secure Login</h6>
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-success mb-2">🔒</div>
                    <small>SSL Secure</small>
                  </div>
                  <div className="col-4">
                    <div className="text-success mb-2">🛡️</div>
                    <small>Data Protected</small>
                  </div>
                  <div className="col-4">
                    <div className="text-success mb-2">🔐</div>
                    <small>Encrypted</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}

          {/* Contact Support */}
          <div className="text-center mt-3">
            <p className="text-muted small mb-0">
              Need help?{" "}
              <Link to="/contact" className="text-decoration-none">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
