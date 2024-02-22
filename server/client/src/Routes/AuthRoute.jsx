import { useContext } from "react";
import {UserContext} from '../contexts/UserContext'
import {Outlet , Navigate} from 'react-router-dom'

const AuthRoute = () =>{
    const {user} = useContext(UserContext);

    return user.email ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute;