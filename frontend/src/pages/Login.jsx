import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../utils/InputField";
import { loginUserAsync } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";
const Login = () => {
  const { isError, message, isSuccess } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate("/feed");
    }
  }, [message, isError, isSuccess, navigate]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(formData));
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} // Full viewport height
    >
      <h1 className="text-secondary pb-5">
        The <span className="text-primary">Social</span> Network
      </h1>

      <div
        className="bg-white p-4 shadow"
        style={{ borderRadius: "15px", maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex justify-content-between">
          <h2 className="pb-2">
            Log<span className="text-primary">in</span>
          </h2>
          <FiLogIn size={40} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 text-muted pt-1">
            <div className="col-md-12">
              <InputField
                label="Email"
                type="text"
                placeholder="you@company.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12 pb-3">
              <InputField
                label="Password"
                type="password"
                placeholder="Please enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="col-md-12 text-danger pt-0 mt-0">
                <small>{error}</small>
              </div>
            )}

            <button
              className="btn btn-primary w-100"
              style={{ borderRadius: "10px" }}
              type="submit"
              disabled={!!error}
            >
              Log In
            </button>

            <p className="text-decoration-none pt-3 text-center mb-0">
              Don't have an acount?{" "}
              <Link to="/" className="text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
