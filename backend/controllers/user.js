const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");//para encriptar la contraseña



const registerUser = async (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.password) return res.status(400).send("process failed: incomplete data");

    let existingUser = await User.findOne({email: req.body.email});
    if(existingUser) return res.status(400).send("process failed: the email user is already register");

    let hash = await bcrypt.hash(req.body.password, 10);// se encripta el usuario
    
    let role = await Role.findOne({name: "user"});
    if(!role) return res.status(400).send("process failed: no role was assigned");

    let user = new User({

        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: role._id,
        dbStatus: true,
    });

    let result = await user.save();
    if(!result) return res.status(400).send("failed to register user");

    
    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (error) {
       return res.status(400).send("failed to register user");
    }


}


const listUser = async (req,res) => {
    let user = await User.find({name: new RegExp(req.params["name"], "i")}).populate("roleId").exec();

    if(!user || user.length === 0) return res.status(400).send("Process faile: no user");
    return res.status(200).send({user});

}

module.exports = {registerUser,listUser};

