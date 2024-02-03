import { RoleTypes } from "../interfaces/basicFaces";

export const getRoleNumber = (value: RoleTypes | string) => {

    if (value == RoleTypes.user || value == "user") return 1
    else if (value == RoleTypes.doctor || value == "user") return 2
    else if (value == RoleTypes.admin || value == "user") return 3
    else return 0
}

export const getRoleString = (value: number) => {

    if (value == 1) return "user"
    else if (value == 2) return "doctor"
    else if (value == 3) return "admin"
    else return "None"
}