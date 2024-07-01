import express from "express";
import usersRoute from '../backend/routes/userRoutes.mjs'
import dotenv from 'dotenv'; 
import cors from 'cors'
import exploreRoutes from '../backend/routes/exploreRoutes.mjs'
import connectMongoDB from "./db/connection.mjs";
import authRoute from '../backend/routes/authRoute.mjs'
import "./passport/github.auth.mjs"
import passport from "passport";
import session from "express-session";
import path from "path";

dotenv.config(); 
const PORT = process.env.PORT || 5000;
const app = express(); 
const __dirname = path.resolve(); 



app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors()); 







app.use('/api/auth', authRoute); 
app.use('/api/users', usersRoute); 
app.use('/api/explore', exploreRoutes); 

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); 
})



app.listen(PORT, () => {
    console.log(`Server Started at PORT :${PORT}`)
    connectMongoDB(); 
})