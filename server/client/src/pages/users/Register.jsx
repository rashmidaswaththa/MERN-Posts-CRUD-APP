import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/userController";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {

  //Use user context
  const {setUser} = useContext(UserContext);

  //Navigate to the dashboard
  const navigate = useNavigate();

  //Error State
  const [error , setError] = useState('');

  //Handle user input
  const [inputData, setInputData] = useState({
    email : '',
    password : '',
    confirmPassword : ''
  });

  //handle user form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(inputData.email, inputData.password, inputData.confirmPassword);
      setUser({email: inputData.email , posts: []})
      navigate('/dashboard')
    } catch (error) {
      setError(error.message);
    }
  }


  return(
    <section className="card">
        <h1 className="title">Register Here</h1>
        <form onSubmit={handleRegister}>
            <input type="email" placeholder="Email Address" name="email" autoFocus className="input" value={inputData.email} onChange={(e) => setInputData( {...inputData, email: e.target.value})} />
            <input type="password" placeholder="Password" name="password" className="input" value={inputData.password} onChange={(e) => setInputData( {...inputData, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="input" value={inputData.confirmPassword} onChange={(e) => setInputData( {...inputData, confirmPassword: e.target.value})} />
            <button className="btn">Register</button>
        </form>

        {error && <Alert msg={error}/>}
    </section>
  )
}

export default Register;
