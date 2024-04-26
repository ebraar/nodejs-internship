const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { response } = require("express")
const { createToken } = require("../middlewares/validation/auth")

const login = async (req, res) => {
    const { email, password } = req.body

    const userInfo = await user.findOne({email})

    console.log(userInfo);

    if(!userInfo)
        throw new APIError("Email ya da şifre hatalıdır !", 401)

    const comparePassword = await bcrypt.compare(password, userInfo.password)
    console.log(comparePassword);

    if(!comparePassword)
    throw new APIError("Email ya da şifre hatalıdır !", 401)
    createToken(user, res)

}

const register = async (req, res) => {
    const { email } = req.body;
    const userCheck = await user.findOne({email})

    if(userCheck){
        throw new APIError("Girmiş olduğunuz email kullanımda!", 401)
        
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)
    
    console.log("hash şifre:",req.body.password);

    const userSave = new user(req.body)

    await userSave.save()
            .then((data) => {
                return new Response(data).created(res)
            })
            .catch((err) => {
                throw new APIError("Kullanıcı kayıt edilemedi !", 400)
            })
}

const me = async (req, res) => {
    return new Response(req.user).success(res)
}

module.exports = {
    login,
    register,
    me
}