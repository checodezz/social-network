import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
