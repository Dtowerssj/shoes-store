import {Router} from 'express';
const router = Router();

import * as usersController from "../controllers/users.controller";
import {authJwt, verifySignUp} from "../middlewares"

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], usersController.getUsers);

router.get('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersController.getUserById);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRoleExists], usersController.createUser);

router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersController.updateUserById);

router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersController.deleteUserId);

export default router;
