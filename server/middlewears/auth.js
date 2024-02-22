import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import 'dotenv/config.js';

const auth = async (req, res, next) => {

    //check is the request headers contains the authorization key 
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({msg: "Authorization is not found"});
    }

    //grab the token from the headers
    const token = authorization.split(" ")[1];

    console.log(token);
    try {
        //extract user id from the token
        const { _id } = jwt.verify(token, process.env.SECRET);
        console.log({ _id });
        req.user = await User.findById({ _id }).select("_id");
        console.log(req.user);
    } catch (error) {
        res.status(401).json({error: error.message});
    }

    next();

}

export default auth;