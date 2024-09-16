import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import styles from "../css/Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { clearError, fetchFeedData } from "../features/feed/feedSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(clearError());
      dispatch(fetchFeedData());
    }
  }, [token, dispatch]);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${styles.customHeader} `}
    >
      <div className="container d-flex align-items-center justify-content-between ">
        <Link to="/" className={`navbar-brand ${styles.logo}`} href="/">
          Social <span className={styles.highlight}>Network</span>
        </Link>

        <form className={`d-flex ${styles.searchForm}`} role="search">
          <input
            className={`form-control ${styles.searchInput}`}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        <button
          className={`btn btn-outline-primary`}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <IoLogOutOutline size={25} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
