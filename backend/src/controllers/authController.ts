import { Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { getMockData, addUser } from '../config/mockDb';

export const register = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { name, email, phone, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = new User({
        name,
        email,
        phone,
        password,
        role,
      });

      await user.save();
      const token = generateToken(user._id.toString(), user.email, user.role);

      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbError) {
      // MongoDB not available, use mock data
      const mockData = getMockData();
      const existingMockUser = mockData.users.find((u: any) => u.email === email);
      if (existingMockUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const newUser = {
        _id: String(mockData.users.length + 1),
        name,
        email,
        phone,
        password,
        role,
        location: { address: 'Unknown', lat: 0, lng: 0 },
        skills: [],
        isVerified: false,
        rating: 0,
        totalReviews: 0,
      };

      addUser(newUser);
      const token = generateToken(newUser._id, email, role);

      return res.status(201).json({
        message: 'User registered successfully (mock mode)',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id.toString(), user.email, user.role);

      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbError) {
      // MongoDB not available, use mock data
      const mockData = getMockData();
      const user = mockData.users.find((u: any) => u.email === email);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials (mock mode)' });
      }

      const token = generateToken(user._id, email, user.role);

      return res.json({
        message: 'Login successful (mock mode)',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ user });
    } catch (dbError) {
      // MongoDB not available, use mock data
      const mockData = getMockData();
      const user = mockData.users.find((u: any) => u._id === req.user?.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found (mock mode)' });
      }

      return res.json({ user });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.user?.id, req.body, {
      new: true,
    });

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const googleAuth = async (req: AuthRequest, res: Response) => {
  try {
    const { email, name, picture } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        avatar: picture,
        isVerified: true,
        role: 'worker',
        phone: `+91${Date.now()}`,
        password: 'google-oauth',
      });
      await user.save();
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    res.json({
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
