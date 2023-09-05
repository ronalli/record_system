import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authUser, loginUser, registerUser } from '../controller/user.js';
import { registerValidator } from '../middleware/register-validator.js';

const router = Router();

router.get('/', auth, authUser);

router.post('/register', registerValidator, registerUser);

router.post('/login', loginUser);

export default router;
