require("dotenv").config()
const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

// create task
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("-")}.txt`,
    req.body.description,
    (err) => {
      res.redirect("/")
    }
  )
})

// get all tasks
app.get("/", (req, res) => {
  fs.readdir("./files", (err, data) => {
    res.render("index", { tasks: data })
  })
})

// get a single task
app.get("/tasks/:taskName", (req, res) => {
  fs.readFile(`./files/${req.params.taskName}`, "utf-8", (err, taskData) => {
    res.render("task", { taskName: req.params.taskName, taskDesc: taskData })
  })
})

// edit & update a task
app.get("/edit/:taskName", (req, res) => {
  res.render("edit", { oldTitle: req.params.taskName })
})

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.oldTitle}`,
    `./files/${req.body.newTitle}`,
    (err) => {
      res.redirect("/")
    }
  )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`)
})
