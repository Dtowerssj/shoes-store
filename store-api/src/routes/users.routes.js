import {Router} from 'express';
const router = Router();

import * as usersController from "../controllers/users.controller";
import {authJwt, verifySignUp} from "../middlewares"

router.get('/', usersController.getUsers);

router.get('/:userId', usersController.getUserById);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRoleExists], usersController.createUser);

router.put('/:userId', usersController.updateUserById);

router.delete('/:userId', usersController.deleteUserId);

export default router;
