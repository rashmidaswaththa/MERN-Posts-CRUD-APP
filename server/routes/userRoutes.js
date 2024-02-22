import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

//api for register user
router.post('/register', registerUser );

//api for register user
router.post('/login', loginUser );

export {router as userRoutes};