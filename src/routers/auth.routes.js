const { register, login, me } = require("../controllers/auth.controller")
const router  = require("express").Router()
const authValidation = require("../middlewares/validation/auth.validation")
const { tokenCheck } = require("../middlewares/validation/auth")

router.post("/login", authValidation.login, login)

router.post("/register", authValidation.register, register)

router.get("/me", tokenCheck, me)

module.exports = router 