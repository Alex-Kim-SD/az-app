import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  try {
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json({ message: 'User created!', user: newUser });
  } catch (err) {
    console.error('User creation failed:', err); // 👈 Add this to log error
    res.status(500).json({ error: 'Failed to create user' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
// This code defines the user-related routes for the Express application.
