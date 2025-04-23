import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = new User({ name: req.body.name });
  await newUser.save();
  res.status(201).json({ message: 'User created!', user: newUser });
};
