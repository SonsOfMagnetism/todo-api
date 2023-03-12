// Dependencies
require("dotenv").config()
const {PORT=3000, DATABASE_URL} = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

// Database Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
})

const Todo = mongoose.model("Todo", TodoSchema)

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.get("/", (req,res) => {
    res.send("hello world")
})

// Listener
app.listen(PORT, () => console.log(`You are now on Port ${PORT}`))