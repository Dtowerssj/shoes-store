import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller'
import {verifySignUp} from '../middlewares'

router.post('/signUp', [verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExists], authController.signUp)

router.post('/signIn', authController.signIn)


export default router;