import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";

const Layout = ({ children }) => {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
