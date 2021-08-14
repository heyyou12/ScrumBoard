const express = require("express");
const router = express.Router();
const UserConttroller = require("../controllers/user");

router.post("/registerUser", UserConttroller.registerUser);
//http://localhost:3001/api/user/listUser/Pe
router.get("/listUser/:name?", UserConttroller.listUser);//cuando necesitamos filtrar, con el simbolo pregunta debe ir asi :name? es opcional si no lo tiene es obligatorio, con : es para enviar un parametro

module.exports = router;