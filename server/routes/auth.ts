import { RequestHandler } from "express";
import { User, AuthResponse, ApiResponse } from "@shared/types";

// Mock user storage - in production this would be a database
const mockUsers: (User & { password: string })[] = [];

export const loginUser: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Email and password are required",
    };
    return res.status(400).json(response);
  }

  // Find user
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Invalid credentials",
    };
    return res.status(401).json(response);
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  const response: AuthResponse = {
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}`,
  };

  res.json(response);
};

export const signupUser: RequestHandler = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Name, email, and password are required",
    };
    return res.status(400).json(response);
  }

  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    const response: ApiResponse<never> = {
      success: false,
      error: "User with this email already exists",
    };
    return res.status(409).json(response);
  }

  // Create new user
  const newUser: User & { password: string } = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    addresses: [],
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  const response: AuthResponse = {
    user: userWithoutPassword,
    token: `mock-jwt-token-${newUser.id}`,
  };

  res.status(201).json(response);
};

export const getCurrentUser: RequestHandler = (req, res) => {
  // In a real app, you'd verify the JWT token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const response: ApiResponse<never> = {
      success: false,
      error: "No token provided",
    };
    return res.status(401).json(response);
  }

  // Mock token verification
  const token = authHeader.replace("Bearer ", "");
  const userId = token.replace("mock-jwt-token-", "");

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Invalid token",
    };
    return res.status(401).json(response);
  }

  const { password: _, ...userWithoutPassword } = user;

  const response: ApiResponse<User> = {
    success: true,
    data: userWithoutPassword,
  };

  res.json(response);
};
