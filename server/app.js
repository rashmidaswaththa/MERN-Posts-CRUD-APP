import express from 'express';
import { postsRoutes } from './routes/postsRoutes.js';
import { userRoutes } from './routes/userRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

//resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create express object
const app = express();

//middlewear to recieve json
app.use(express.json());


//adding the api endpoints
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);

//use the client app
app.use(express.static(path.join(__dirname, "client/dist")))

//render client for any path
app.get("*" , (req , res) => res.sendFile(path.join(__dirname, "client/dist/index.html")));

export default app;