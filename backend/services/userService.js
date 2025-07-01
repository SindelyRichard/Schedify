const User = require('../models/User');

async function getLevelAndXp(username) {
    const user = await User.findOne({username});
    if(!user){
        return {success: false, message: 'User not found!'};
    }
    
    return { success: true, xp:user.xp,level:user.level };
}

module.exports = {
    getLevelAndXp
};