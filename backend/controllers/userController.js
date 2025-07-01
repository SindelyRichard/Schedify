const { getLevelAndXp } = require('../services/userService');
const { verifyToken } = require('../services/jwtService');

async function getLvlXp(req,res){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(403).json({ message: 'Invalid token' });
    }
    const username = req.query.username || decoded.username;
    const result = await getLevelAndXp(username);
    if(result.success){
        res.json({xp:result.xp,level:result.level });
    }else{
        res.status(404).json({ message: result.message });
    }
}

module.exports = {
    getLvlXp
};