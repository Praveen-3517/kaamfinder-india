import crypto from 'crypto';
import { Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { getMockData, addUser } from '../config/mockDb';

export const register = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { name, email, phone, password, role } = req.body;

    try {
      const emailClean = email.toLowerCase().trim();
      const existingUser = await User.findOne({ email: emailClean });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = new User({
        name: name.trim(),
        email: emailClean,
        phone: phone.trim(),
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
      const emailClean = email.toLowerCase().trim();
      const user = await User.findOne({ email: emailClean }).select('+password');
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

export const forgotPassword = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    
    // Allow mock mode logic if DB isn't used
    let user;
    try {
      user = await User.findOne({ email });
    } catch (dbError) {
      // Mock mode
      const mockData = getMockData();
      user = mockData.users.find((u: any) => u.email === email);
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
      await User.findOneAndUpdate(
        { email },
        { resetPasswordToken, resetPasswordExpire }
      );
    } catch (dbError) {
      // Mock mode
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpire = resetPasswordExpire;
    }

    // In a real app, you would send an email here.
    // For this demonstration without SMTP, we return the token in the response so you can test the UI.
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    console.log(`[SIMULATED EMAIL] Password reset requested for ${email}. Link: ${resetUrl}`);

    res.status(200).json({ 
      message: 'Password reset link generated successfully',
      simulatedLink: resetUrl,
      resetToken
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { token, newPassword } = req.body;
    
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    
    let user;
    try {
      user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: new Date() }
      });
    } catch (dbError) {
      // Mock mode
      const mockData = getMockData();
      user = mockData.users.find((u: any) => 
        u.resetPasswordToken === resetPasswordToken && 
        new Date(u.resetPasswordExpire) > new Date()
      );
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    try {
      const userDoc = await User.findById(user._id);
      if (userDoc) {
        userDoc.password = newPassword;
        userDoc.resetPasswordToken = undefined;
        userDoc.resetPasswordExpire = undefined;
        await userDoc.save();
      }
    } catch (dbError) {
      // Mock mode
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    }

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
