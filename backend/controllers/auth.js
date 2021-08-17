const bcrypt = require("bcrypt");
const User = require("../models/user");

const login = async (req,res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Incorrect email or password");

    const hash = await bcrypt.compare(req.body.password,user.password);//se compara la clave que llega con la clave que trae que se comprobo con en la busqueda de la base de datos
    if(!hash)return res.status(400).send("Incorrect email or password");

    try {
        const jwtToken = user.generateJWT();
        return res.status(200).send({jwtToken});
    } catch (error) {
        return res.status(400).send("login error");
    }
}
module.exports = {login};