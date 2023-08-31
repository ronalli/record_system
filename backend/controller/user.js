import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/User.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(409).json({
      message: 'Пользователь уже есть!',
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash: encryptedPassword,
  });

  const token = jwt.sign(
    {
      user_id: user._id,
      email,
    },
    process.env.TOKEN_KEY,
    { expiresIn: '10d' }
  );
  user.token = token;
  res.status(201).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: 'Пользователь не найден!',
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(404).json({
      message: 'Неверный логин или пароль!',
    });
  }
  if (user && isValidPassword) {
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '10d' }
    );
    user.token = token;

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json(userData);
  }
};

const authUser = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (user) {
    return res.json({
      user,
    });
  }
  return res.json({
    message: 'Non authorization',
  });
};

export { registerUser, loginUser, authUser };
