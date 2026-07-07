"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const mockDb_1 = require("../config/mockDb");
const register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        try {
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }
            const user = new User_1.default({
                name,
                email,
                phone,
                password,
                role,
            });
            await user.save();
            const token = (0, jwt_1.generateToken)(user._id.toString(), user.email, user.role);
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
        }
        catch (dbError) {
            // MongoDB not available, use mock data
            const mockData = (0, mockDb_1.getMockData)();
            const existingMockUser = mockData.users.find((u) => u.email === email);
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
            (0, mockDb_1.addUser)(newUser);
            const token = (0, jwt_1.generateToken)(newUser._id, email, role);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        try {
            const user = await User_1.default.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = (0, jwt_1.generateToken)(user._id.toString(), user.email, user.role);
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
        }
        catch (dbError) {
            // MongoDB not available, use mock data
            const mockData = (0, mockDb_1.getMockData)();
            const user = mockData.users.find((u) => u.email === email);
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials (mock mode)' });
            }
            const token = (0, jwt_1.generateToken)(user._id, email, user.role);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        try {
            const user = await User_1.default.findById(req.user?.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json({ user });
        }
        catch (dbError) {
            // MongoDB not available, use mock data
            const mockData = (0, mockDb_1.getMockData)();
            const user = mockData.users.find((u) => u._id === req.user?.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found (mock mode)' });
            }
            return res.json({ user });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.user?.id, req.body, {
            new: true,
        });
        res.json({
            message: 'Profile updated successfully',
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateProfile = updateProfile;
const googleAuth = async (req, res) => {
    try {
        const { email, name, picture } = req.body;
        let user = await User_1.default.findOne({ email });
        if (!user) {
            user = new User_1.default({
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
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.email, user.role);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.googleAuth = googleAuth;
//# sourceMappingURL=authController.js.map