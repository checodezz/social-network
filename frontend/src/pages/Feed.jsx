import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchFeedData, clearError } from "../features/feed/feedSlice";
import LeftSidebar from "../components/LeftSidebar";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const {
    feedData = [],
    isLoading,
    error,
  } = useSelector((state) => state.feed);

  console.log(user);
  useEffect(() => {
    if (!(token && user)) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (token && user) {
      dispatch(clearError());
      dispatch(fetchFeedData());
    }
  }, [dispatch, token, user]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="row  pt-3">
        {user && (
          <>
            <LeftSidebar user={user} />
            <div className="col-md-8 bg-body-secondary rounded">
              <div>Custom column padding</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
