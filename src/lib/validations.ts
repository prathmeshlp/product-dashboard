import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  discountPercentage: z.number().min(0).max(100).optional(),
  stock: z.number().int().min(0),
  brand: z.string().min(1),
  category: z.string().min(1),
  thumbnail: z.string().min(1),
  images: z.array(z.string()).optional(),
});
