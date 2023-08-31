import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authUser, loginUser, registerUser } from '../controller/user.js';

const router = Router();

router.get('/', auth, authUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
