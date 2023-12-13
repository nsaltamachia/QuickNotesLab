const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function create(req, res) {
    try {
      // Add the user to the database
      console.log(req.body)
      const user = await User.create(req.body);
      console.log(user)
        // token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
   } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
        return res.status(400).json(err);
    }
}


async function login(req, res) {
  console.log(req.body);
    try {
      const user = await User.findOne({ email: req.body.email }); 
      console.log(user);
      if (!user) return res.status(404).json({ err: 'user not found' });
      const matchedPassword = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!matchedPassword) return res.status(401).json({ err: 'password incorrect' });
      res.json( createJWT(user) );
    } catch (err) {
      console.log(err);
        return res.status(500).json(err);
    }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  // in the headers
  console.log('req.user', req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = {
  create,
  login,
  checkToken
};