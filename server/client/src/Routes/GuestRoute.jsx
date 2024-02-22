import { useContext } from "react";
import {UserContext} from '../contexts/UserContext'
import {Outlet , Navigate} from 'react-router-dom'

const GuestRoute = () =>{
    const {user} = useContext(UserContext);

    return !user.email ? <Outlet /> : <Navigate to="/dashboard" />
}

export default GuestRoute;