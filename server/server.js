const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB;
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoutes")
const { connectToMongoDB } = require("./connection/connectmongoDB")
const { checkAuthenticationOfUser } = require("./middlewares/auth")

//connecting data base
connectToMongoDB(mongoUrl);

//setting up middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

// setting up routes
app.get("/", (req, res) => {
  res.json({ Status: " server started at port ", PORT: PORT })
})
app.use("/auth", authRouter)
app.use("/user", checkAuthenticationOfUser , userRouter)


//starting server
app.listen(PORT, () => { console.log("Server Started at port : ", PORT) });