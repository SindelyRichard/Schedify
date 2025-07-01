const { verifyToken } = require('../services/jwtService');
const { dailyTasks, setTaskCompleted } = require('../services/taskService');

async function getDailyTasks(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(403).json({ message: 'Invalid token' });
    }
    const username = decoded.username;
    const result = await dailyTasks(username);
    if (result.success) {
        res.json(result.tasks);
    } else {
        res.status(500).json({ message: result.message });
    }
}

async function addTasks(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Invalid token' });
    }
    const username = decoded.username;
    const { title, daily } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'No title provided' });
    }
    const result = await addTask(username, title, daily);
    if (result.success) {
        res.json(result.task);
    } else {
        res.status(500).json({ message: result.message });
    }
}

async function setTask(req,res){
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Invalid token' });
    }
    const id = req.params.id;
    const result = await setTaskCompleted(id);
    if (result.success) {
        res.json(result.task);
    } else {
        res.status(500).json({ message: result.message });
    }
}

module.exports = {
    getDailyTasks,
    addTasks,
    setTask
};