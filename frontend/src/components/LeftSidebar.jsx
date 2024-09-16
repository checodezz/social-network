import { Link } from "react-router-dom";
import { IoNewspaperOutline, IoBookmarkOutline } from "react-icons/io5";
import { GoRocket } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { FaBootstrap } from "react-icons/fa";

const LeftSidebar = ({ user }) => {
  return (
    <div
      className="col-md-3 bg-body-tertiary"
      style={{
        minHeight: "100vh",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="d-flex align-items-center user"
        style={{
          gap: "15px",
          padding: "10px",
          background: "#FFF",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <img
          className="rounded-circle"
          src={user.avatar}
          alt="profile picture"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div>
          <h6 className="mb-1">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              {user.firstname} {user.lastname}
            </Link>
          </h6>
          <span className="text-muted">{user.email}</span>
        </div>
      </div>

      <div className="navigation ps pt-3">
        <Link to="/feed" className="nav-link hover-link">
          <p className="d-flex align-items-center mb-3">
            <IoNewspaperOutline size={25} className="me-2" /> Feed
          </p>
        </Link>
        <Link to="/explore" className="nav-link hover-link">
          <p className="d-flex align-items-center mb-3">
            <GoRocket size={25} className="me-2" /> Explore
          </p>
        </Link>
        <Link to="/bookmarks" className="nav-link hover-link">
          <p className="d-flex align-items-center mb-3">
            <IoBookmarkOutline size={25} className="me-2" /> Bookmarks
          </p>
        </Link>
        <Link to="/profile" className="nav-link hover-link">
          <p className="d-flex align-items-center mb-3">
            <AiOutlineUser size={25} className="me-2" /> Profile
          </p>
        </Link>
      </div>

      <div className="text-muted container pt-4" style={{ fontSize: "1rem" }}>
        <strong className="font-monospace">ABOUT SOCIAL NETWORK</strong>
        <p className="pt-1">
          Social network is built with Express.js backend serving API responses
          to React.js.
          <br />
          Know more:
        </p>

        <div className="tech-stack pt-1">
          <a
            href="https://github.com/checodezz/social-network"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <FaGithub color="grey" size={25} className="me-2" /> Project
              Github
            </p>
          </a>
          <a
            href="https://expressjs.com/"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <SiExpress color="black" size={25} className="me-2" /> Express.js
            </p>
          </a>
          <a
            href="https://reactjs.org/"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <FaReact color="skyblue" size={25} className="me-2" /> React.js
            </p>
          </a>
          <a
            href="https://www.mongodb.com/"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <SiMongodb color="green" size={25} className="me-2" /> MongoDB
            </p>
          </a>
        </div>

        <br />
        <p>Theming with:</p>
        <div className="theming ps-2">
          <a
            href="https://getbootstrap.com/"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <FaBootstrap color="violet" size={25} className="me-2" />{" "}
              Bootstrap
            </p>
          </a>
          <a
            href="https://react-icons.github.io/"
            target="_blank"
            className="nav-link hover-link"
          >
            <p className="d-flex align-items-center mb-3">
              <GrReactjs color="skyblue" size={25} className="me-2" />{" "}
              React-Icons
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
