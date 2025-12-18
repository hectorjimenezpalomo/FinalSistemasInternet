import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Trainer } from '../models/Trainer';

export const createToken = (trainer: any) => {
  return jwt.sign({ id: trainer._id, name: trainer.name }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const getUserFromToken = async (token?: string) => {
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await Trainer.findById(decoded.id);
    return user;
  } catch {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
