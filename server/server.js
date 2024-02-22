import mongoose from 'mongoose';
import 'dotenv/config.js';
import app from './app.js';


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to DB successfully !!!");
        app.listen(process.env.PORT, "localhost", () => console.log("Server is running!!"));
    })
    .catch((err) => {console.log(err)})


