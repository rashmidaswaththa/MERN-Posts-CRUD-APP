import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/userController";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../controllers/postController";
import { PostContxt } from "../../contexts/PostContext";

const CreatePost = () => {
  //Use user context
  const { posts , setPosts } = useContext(PostContxt);

  //Navigate to the dashboard
  const navigate = useNavigate();

  //Error State
  const [error, setError] = useState("");

  //Handle user input
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await createPost(inputData.title, inputData.body);
        setPosts({...posts , data})
        navigate('/dashboard')
        console.log(data);
        
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <div className="card">
      <h1 className="title">Create New Post</h1>

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
        <button className="btn">Create New Post</button>
      </form>

      {error && <Alert msg={error}/>}
    </div>
  );
};

export default CreatePost;
