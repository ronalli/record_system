import { Router } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Employees from '../model/Employees.js';
import User from '../model/User.js';
import { auth } from '../controllers/auth.js';

dotenv.config();

const router = Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.body.id);
  if (user) {
    return res.json({
      user,
    });
  }
  return res.json({
    message: 'non authorization',
  });
});

router.get('/v1/add_employees', async (req, res) => {
  const employees = await Employees.create({
    name: 'Bob',
    email: 'Bob@gmail.com',
    password: '56457676fdggdf',
    description:
      'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum океана но выйти предупредила которой скатился текст, осталось приставка. Единственное ведущими заманивший рот деревни.',
  });
  res.status(201).json(employees);
});

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
});

export default router;
