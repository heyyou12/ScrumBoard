//code auth
const jwt = require("jsonwebtoken");

const auth = async (req,res,next) => {
    let jwtToken = req.header("Authorization")
    if(!jwtToken) return res.status(400).send("Authorization denied: No token");
    console.log(jwtToken);
    //[bearer,fksajirfweoiru9823739434]
    //    0   ,  1     
    jwtToken = jwtToken.split(" ")[1]
    //fksajirfweoiru9823739434
    if(!jwtToken)return res.status(400).send("Authorization denied: No token");
    
    try {
        //payload:cuerpo del dato
        const payload = await jwt.verify(jwtToken,process.env.SECRET_KEY_JWT);
        req.user = payload;
        next(); 
    } catch (error) {
        return res.status(400).send("Authorization denied: Invalid token")
    }
};
    module.exports = {auth};
