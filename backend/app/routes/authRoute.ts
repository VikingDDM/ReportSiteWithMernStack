import express from 'express';
import { loginHandler, registerHandler, logoutHandler, refreshAccessTokenHandler, } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

// Refresh access toke route
router.get('/refresh', refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.get('/logout', logoutHandler);

export default router;
