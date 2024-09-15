import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedData, clearError } from "../features/feed/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { feedData, isLoading, error } = useSelector((state) => state.feed);

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
