import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Не верный формат почты').isEmail(),
  body(
    'password',
    'Минимальная длина пароля 8 символов и максимальная 16'
  ).isLength({ min: 8, max: 16 }),
  body('name', 'Минимальная длиня имени 4 символа').isLength({ min: 4 }),
];
