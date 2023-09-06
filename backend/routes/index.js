import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authUser, loginUser, registerUser } from '../controller/user.js';
import { userDataValidate } from '../middleware/user-validator.js';

const router = Router();

router.get('/', auth, authUser);

router.post('/register', userDataValidate, registerUser);

router.post('/login', loginUser);

export default router;
