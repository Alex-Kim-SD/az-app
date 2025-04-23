import { Request, Response } from 'express';
import { User } from '../models/User'; // example import, adjust as needed

// example route
export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};
