const Motivation = require("../models/Motivation");

async function motivation() {
    try {
        const motivations = await Motivation.find();
        if (motivations.length === 0) {
            return { success: false, message: 'No motivations found' };
        }

        const randomIndex = Math.floor(Math.random() * motivations.length);
        const randomMotivation = motivations[randomIndex];

        return { success: true, title:randomMotivation.title };
    } catch (err) {
        return { success: false, message: 'Server error' };
    }
}

module.exports={
    motivation
};