require("express-async-errors")
const express = require("express")
const app = express()
require("dotenv").config()
require("./src/db/dbConnection")
const port = process.env.PORT || 5001
const errorHandlerMiddleware = require("./src/middlewares/errorHandler")

app.get("/", (req, res) => {
    req.json({
        message: "Hoş Geldiniz"
    })
})

const router = require("./src/routers/")

// middlewares
app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.use("/api", router)

// hata yakalama
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server ${port} portundan çalışıyor..`)
})