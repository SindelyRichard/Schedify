const { registerUser,loginUser } = require('../services/authService');

async function register(req, res) {
  const { username, password } = req.body;
  const result = await registerUser(username, password);
  if (result.success) {
    res.json({ message: 'User registered successfully' });
  } else {
    res.status(401).json({ message: result.message });
  }
};

async function  login(req,res){
    const {username,password} = req.body;
    const result = await loginUser(username,password);
    if(result.success){
        res.json({token: result.token });
    }else{
        res.status(401).json({ message: result.message });
    }
}

module.exports = {
  register,
  login
};