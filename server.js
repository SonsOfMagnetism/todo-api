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

// Index
app.get("/todo", async (req, res) => {
    try {
        res.json(await Todo.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Create
app.post("/todo", async (req, res) => {
    try {
      res.json(await Todo.create(req.body))
    } catch (error) {
      res.status(400).json(error)
    }
})

// Update
app.put("/todo/:id", async(req, res) => {
    try {
        res.json(
            await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
        )
    } catch (error) {
        res.send(400).json(error)
    }
})

// Delete
app.delete("/todo/:id", async(req, res) => {
    try {
        res.json(await Todo.findByIdAndRemove(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Listener
app.listen(PORT, () => console.log(`You are now on Port ${PORT}`))