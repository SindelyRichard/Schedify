const { getLevelAndXp, updateLvlXp } = require('../services/userService');
const { verifyToken } = require('../services/jwtService');

async function getLvlXp(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(403).json({ message: 'Invalid token' });
    }
    const username = decoded.username;
     if (!username) {
        return res.status(400).json({ message: 'No username provided' });
    }
    const result = await getLevelAndXp(username);
    if(result.success){
        res.json({xp:result.xp,level:result.level,username });
    }else{
        res.status(404).json({ message: result.message });
    }
}

async function updateLevelXp(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(403).json({ message: 'Invalid token' });
    }
    const {  level, xp } = req.body;
    const username = decoded.username;
    const result = await updateLvlXp(username,level,xp);

    if(result.success){
        res.json({result:result.user });
    }else{
        res.status(404).json({ message: result.message });
    }

}

module.exports = {
    getLvlXp,
    updateLevelXp
};