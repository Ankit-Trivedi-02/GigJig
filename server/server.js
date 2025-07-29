const express = require("express");
const app = express();
const PORT = 3000;
const userRouter = require("./routes/userRoutes")
const { connectToMongoDB } = require("./connection/connectmongoDB")

connectToMongoDB("mongodb://127.0.0.1:27017");

app.get("/", (req, res) => {
    res.json({ Status: " server started at port ", PORT: PORT })
})
app.use("/user", userRouter)

app.listen(PORT, () => { console.log("Server Started at port : ", PORT) });