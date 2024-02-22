import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

//create jwt token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "10d"});
};

//Api for register user
const registerUser = async (req, res) => {
    
    //grab user details from the req body
    const {email, password} = req.body;

    //check if field are not empty
    if(!email || !password){
        res.status(400).json({error : "Please fill all the fields.."});
    }

    //check if email already exist
    const user = await User.findOne({email});

    if(user) {
        return res.status(400).json({error : "This email is already exist.."});
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password , salt);

    try {
        const user = await User.create({email, password : hashed});
        //create jwt token
        const token = createToken(user._id);
        res.status(200).json({email ,  token});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const loginUser = async (req, res) => {
    //grab user details from the req body
    const {email, password} = req.body;

    //check if field are not empty
    if(!email || !password){
        res.status(400).json({error : "Please fill all the fields.."});
    }

    //check if email already exist
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({error : "This email is not found.."});
    }

    //check password
    const match = await bcrypt.compare(password , user.password);
    if(!match) {
        return res.status(400).json({error : "Incorrect password"});
    }

    try {
        //create jwt token
        const token = createToken(user._id);
        res.status(200).json({email : email , token });
    } catch (error) {
        res.status(500).json({error : error.message});
    }

}

export {registerUser , loginUser}