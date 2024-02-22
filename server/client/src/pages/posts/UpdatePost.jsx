import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../controllers/postController";
import { PostContxt } from "../../contexts/PostContext";

const UpdatePost = () => {
  //Use user context
  const { posts , setPosts } = useContext(PostContxt);

  //Navigate to the dashboard
  const navigate = useNavigate();

  const {state} = useLocation();

  //Error State
  const [error, setError] = useState("");

  //Handle user input
  const [inputData, setInputData] = useState({
    title: state.title,
    body: state.body,
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await updatePost(state._id , inputData.title, inputData.body);
        console.log(data);
        setPosts({...posts , data})
        navigate('/dashboard')
        console.log(data);
        
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <div className="card">
      <h1 className="title">Update Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Post Title"
          type="text"
          value={inputData.title}
          onChange={(e) => setInputData({...inputData , title: e.target.value})}
          autoFocus
        ></input>
        <textarea
          className="input"
          placeholder="Post Content .."
          value={inputData.body}
          onChange={(e) => setInputData({...inputData , body: e.target.value})}
          rows={6}
        ></textarea>
        <button className="btn">Update Post</button>
      </form>

      {error && <Alert msg={error}/>}
    </div>
  );
};

export default UpdatePost;
