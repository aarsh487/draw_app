import { z } from 'zod';

export const SignUpSchema = z.object({
    username: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(6),
});

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const RoomSchema = z.object({
    roomName: z.string().min(1).max(20),
});