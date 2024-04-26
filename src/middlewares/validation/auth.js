const jwt = require("jsonwebtoken")

const createToken = async (user, res) => {
    const payload = {
        sub: user._id,
        name: user.name
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(201).json({
        success: true,
        token,
        message: "Başarılı"
    })
}

const tokenCheck = async (req, res, next) => {
    console.log("token check içerisinde");
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer"); 

    console.log(headerToken);

    if (!headerToken) {
        // APIError tanımlıysa ve hata yönetimi middleware'iniz varsa bu şekilde kullanabilirsiniz.
        // throw new APIError("Geçersiz Oturum, Lütfen Oturum Açın", 401);

        // Eğer APIError tanımlı değilse veya özel hata yönetimi kullanmıyorsanız, aşağıdaki gibi yapabilirsiniz:
        return res.status(401).send("Geçersiz Oturum, Lütfen Oturum Açın");
    }

    const token = req.headers.authorization.split(" ")[1]

    console.log(token);

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoced) => {
        if (err){
            return res.status(401).send("Geçersiz Token");
        }

        const userInfo = await user.findById(decoded.sub).select(" _id name lastname email")

        console.log(userInfo);

        if(!userInfo){
            return res.status(401).send("Geçersiz Token", 401);
        }

        req.user = userInfo
        next();
    })
}

module.exports = {
    createToken,
    tokenCheck
}