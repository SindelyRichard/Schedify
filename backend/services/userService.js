const User = require('../models/User');

async function getLevelAndXp(username) {
    const user = await User.findOne({username});
    if(!user){
        return {success: false, message: 'User not found!'};
    }
    
    return { success: true, xp:user.xp,level:user.level };
}

async function updateLvlXp(username,level,xp){
    const user = await User.findOneAndUpdate(
        {username},
        {level,xp},
        {new:true}
    );
    if (!user) {
        return { success: false, message: 'User not found!' };
    }
    return { success: true, user };

}

module.exports = {
    getLevelAndXp,
    updateLvlXp
};