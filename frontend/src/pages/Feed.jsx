import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFeedData, clearError } from "../features/feed/feedSlice";
import { logout } from "../features/auth/auth";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isSuccess } = useSelector((state) => state.auth); // Add isSuccess to check authentication status
  const {
    feedData = [],
    isLoading,
    error,
  } = useSelector((state) => state.feed);

  console.log(feedData);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [token, navigate]); // Check for changes to token

  useEffect(() => {
    if (token) {
      dispatch(clearError()); // Clear any previous error before fetching new data
      dispatch(fetchFeedData());
    }
  }, [dispatch, token]);

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Feed</h1>
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>
      <ul>
        {/* {feedData &&
          feedData.map((item, index) => (
            <li key={index}>{item.name}</li> // Render feed data here
          ))} */}
      </ul>
    </div>
  );
};

export default Feed;
