"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(2).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.SignInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.RoomSchema = zod_1.z.object({
    roomName: zod_1.z.string().min(1).max(20),
});
