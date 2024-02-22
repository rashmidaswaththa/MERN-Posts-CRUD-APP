import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import image from "../assets/user.png";

const UserProfileBar = () => {

    //Use User Context
    const{ user , setUser} = useContext(UserContext);

    return(
        <div className="profile-card">

            <div className="flex items-start">
                <div><img src={image} className="w-20 h-20"/></div>
                <p className="ml-8 italic font-extrabold text-4xl pt-5">{user.email}</p>
            </div>


        </div>
    )
}

export default UserProfileBar;