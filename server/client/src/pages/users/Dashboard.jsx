import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/Post";
import UserProfileBar from "../../components/UserProfileBar";
import { Link } from "react-router-dom";
import SuccessAlert from "../../components/SuccessAlert";
import Alert from "../../components/Alert";

const Dashboard = () => {
  //Use user context
  const { user, setUser } = useContext(UserContext);

  //Handle loading
  const [loading, setLoading] = useState(true);

  //Error state
  const [error, setError] = useState(null);

  //Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const { userPosts, email } = await getUserPosts();
      setUser({ email, posts: userPosts });
      setLoading(false);
      console.log(userPosts, email);
    }, 500);
  }, []);

  //Handle delete
  const handleDelete = async (_id) => {
    if (confirm("Do you want to delete this post ?")) {
      try {
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }
    }

    const newPosts = user.posts.filter((post) => post._id !== _id);
    setUser({ ...user, posts: newPosts });
  };

  return (
    <div>
      <UserProfileBar />
      <div className="card">
        <div className="title">User Dashboard</div>

        {loading && (
          <p>
            <i className="fa-solid fa-spinner animate-spin text-center text-3xl block"></i>
          </p>
        )}

        {success && <SuccessAlert msg={success} />}

        {error && <Alert msg={error} />}

        {user.posts &&
          user.posts.map((post) => (
            <div key={post._id}>
              <Post post={post}>
                <div className="flex block gap-5 pt-6">
                  <Link
                    className="fa-solid fa-pen-to-square text-green-600 text-2xl"
                    title="Update"
                    to="/update"
                    state={post}
                  ></Link>
                  <button
                    className="fa-solid fa-trash text-red-600 text-2xl"
                    onClick={() => handleDelete(post._id)}
                  ></button>
                </div>
              </Post>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
