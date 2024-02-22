import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/userController";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //Use user context
  const {setUser} = useContext(UserContext);

  //Navigate to the dashboard
  const navigate = useNavigate();

  //Error State
  const [error , setError] = useState(null);

  //Handle user input
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  //handle user form submission
  const handleLogin = async (e) => {
    
    e.preventDefault();
    try {
      await loginUser(email,password);
      setUser({email, posts: []})
      navigate('/dashboard')
    } catch (error) {
      setError(error.message);
    }
  }


  return(
    <section className="card">
        <h1 className="title">Login to your account</h1>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email Address" name="email" autoFocus className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" name="password"  className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn">Login</button>
        </form>

        {error && <Alert msg={error}/>}
    </section>
  )
  
};

export default Login;
