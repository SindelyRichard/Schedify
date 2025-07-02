const Task = require('../models/Task');
const User = require('../models/User');
const cron = require('node-cron');

async function dailyTasks(username){
    try {
        const user = await User.findOne({ username });
        if (!user) return { success: false, message: 'User not found' };
        const tasks = await Task.find({ userId:user._id, daily: true });
        return { success: true, tasks };
    } catch (err) {
        return { success: false, message: 'Server error' };
    }
}

async function addTask(username, title) {
    try {
        const daily = false;
        const user = await User.findOne({ username });
        if (!user) return { success: false, message: 'User not found' };
        const taskCount = await Task.countDocuments({ userId:user._id,daily:false });

        if (taskCount >= 5) {
            return { success: false, message: 'Reached maximum task!' };
        }
        const task = new Task({ userId:user._id, title, daily });
        await task.save();
        return { success: true, task };
    } catch (err) {
        return { success: false, message: 'Server error' };
    }
}

async function setTaskCompleted(id){
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { completed: true },
            { new: true }
        );
        if (!task) return { success: false, message: 'Task not found' };
        return { success: true, task };
    } catch (err) {
        return { success: false, message: 'Server error' };
    }
}

async function yourTasks(username){
    try {
        const user = await User.findOne({ username });
        if (!user) return { success: false, message: 'User not found' };
        const tasks = await Task.find({ userId:user._id, daily: false });
        return { success: true, tasks };
    } catch (err) {
        return { success: false, message: 'Server error' };
    }

}

cron.schedule('0 0 * * *', async () => {
  try {
    await Task.updateMany({ daily: true }, { completed: false });
    await Task.deleteMany({ daily: false });
    console.log('Daily tasks reset completed');
  } catch (err) {
    console.error('Daily reset error:', err);
  }
});

module.exports = {
    dailyTasks,
    addTask,
    setTaskCompleted,
    yourTasks
};