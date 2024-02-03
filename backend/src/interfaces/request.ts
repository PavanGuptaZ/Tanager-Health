import { Request } from "express";

export default interface AuthenticatedRequest extends Request {
    user?: {
        _id: string,
        role: string,
        email: string
    };
}

interface CustomHeaders extends Headers {
    authorization?: string;
    Authorization?: string;
    origin?: string;
}

export interface UserType {
    _id: string,
    name: string,
    email: string,
    phone: number,
    role: RoleTypes,
    profileIcon: number,
    createdAt: string,
    updatedAt: string,
    address: string,
    __v: number,
    token: string
}

enum RoleTypes { "doctor", "user", "admin" }