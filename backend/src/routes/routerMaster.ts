import { Router } from 'express';
import { getUsers, createUser } from '../controllers/usersController';
import { deleteUser } from '../controllers/usersController';

const router = Router();

//users
router.get('/', getUsers);         // GET /users
router.post('/', createUser);      // POST /users
router.delete('/:id', deleteUser); // DELETE /users/:id

export default router;
