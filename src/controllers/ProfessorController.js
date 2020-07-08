const { uuid } = require('uuidv4');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Professor = require('../models/Professor');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: { association: 'professors' },
    });

    return res.json(user);
  },

  async store(req, res) {
    function genetateToken(params = {}) {
      return jwt.sign(params, authConfig.secret, {
        expiresIn: '1d',
      });
    }
    const { userId } = req.params;

    const { name, email, password, graduation } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not Found' });
    }

    const hashedPassword = await hash(password, 8);

    const professor = await Professor.create({
      id: uuid(),
      userId,
      avatar: req.file.filename,
      name,
      email,
      password: hashedPassword,
      graduation,
    });

    return res.send({
      professor,
      token: genetateToken({ id: professor.id }),
    });
  },
};
