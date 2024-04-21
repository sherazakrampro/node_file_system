require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`)
})
