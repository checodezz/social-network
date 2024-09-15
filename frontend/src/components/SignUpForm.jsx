import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../utils/InputField";
import { signUpUserAsync, resetSignUpSuccessful } from "../features/auth/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const { isSignUpSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retype_password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSignUpSuccess) {
      navigate("/login");
      dispatch(resetSignUpSuccessful());
    }
  }, [navigate, isSignUpSuccess, dispatch]);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Directly access the updated values from the event target for comparison
    if (name === "password" || name === "retype_password") {
      const newPassword = name === "password" ? value : formData.password;
      const newRetypePassword =
        name === "retype_password" ? value : formData.retype_password;

      if (
        newPassword !== newRetypePassword &&
        newPassword.length > 0 &&
        newRetypePassword.length > 0
      ) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      setError("");
      try {
        const resultAction = await dispatch(signUpUserAsync(formData));
        if (signUpUserAsync.fulfilled.match(resultAction)) {
          toast.success("Signup successful!");
          setTimeout(() => toast.info("Please Login to continue"), 1000);
        } else {
          toast.error(resultAction.payload);
          setError(resultAction.payload);
        }
      } catch (error) {
        console.log(error);
        setError("An unexpected error occurred");
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="container">
      <div className="bg-white  p-4  shadow" style={{ borderRadius: "15px" }}>
        <h2 className="pb-1">Join Us Now!</h2>
        <p>
          Already a member?{" "}
          <Link to="/login" className="text-decoration-none">
            Sign In
          </Link>
          <br />
          <span
            className="text-muted mt-1 pt-1"
            style={{ fontSize: "15px", fontFamily: "sans-serif" }}
          >
            All fields are mandatory *
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row g-3 text-muted pt-1">
            <div className="col-md-6">
              <InputField
                label="First Name"
                type="text"
                placeholder="John / Alex"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Last Name"
                type="text"
                placeholder="Doe"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12">
              <InputField
                label="Email"
                type="email"
                placeholder="you@company.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Password"
                type="password"
                placeholder="a strong password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 pb-3">
              <InputField
                label="Retype Password"
                type="password"
                placeholder=""
                name="retype_password"
                value={formData.retype_password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Show error message below password fields */}
            {error && (
              <div className="col-md-12 text-danger">
                <small>{error}</small>
              </div>
            )}

            <button
              className="btn btn-primary"
              style={{ borderRadius: "10px" }}
              type="submit"
              disabled={!!error} // Disable button if there's an error
            >
              Sign Up
            </button>
            <p className="text-decoration-none pb-0 mb-0">
              By clicking the button above you agree to our{" "}
              <Link className="text-decoration-none">terms of use</Link> and{" "}
              <Link className="text-decoration-none">privacy policies</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
