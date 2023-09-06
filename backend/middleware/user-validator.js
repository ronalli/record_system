import { body } from 'express-validator';

export const userDataValidate = [
  body('email').optional().isEmail().withMessage('Не верный формат почты'),
  body('password')
    .isString()
    .withMessage('Имя должно быть строкой')
    .isLength({ min: 8, max: 16 })
    .withMessage('Минимальная длина пароля 8 символов и максимальная 16'),
  body('name')
    .isString()
    .withMessage('Имя должно быть строкой')
    .isLength({ min: 4 })
    .withMessage('Минимальная длина имени - 4 символа'),
];
