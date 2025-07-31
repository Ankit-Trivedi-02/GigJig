const express = require("express");
const app = express();
const  cors  = require("cors")
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB;
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoutes")
const { connectToMongoDB } = require("./connection/connectmongoDB")

//connecting data base
connectToMongoDB(mongoUrl);

//setting up middle wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// setting up routes
app.get("/", (req, res) => {
    res.json({ Status: " server started at port ", PORT: PORT })
})
app.use("/auth", authRouter)
app.use("/user", userRouter)


//starting server
app.listen(PORT, () => { console.log("Server Started at port : ", PORT) });