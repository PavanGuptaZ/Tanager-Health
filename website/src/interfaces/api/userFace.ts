import { RoleTypes } from "../basicFaces";

export default interface UserType {
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
    token: string,
    password?: string
}