import { useContext } from "react";
import { UserAction, UserContext } from "./ContextProvider";
import UserType from "../interfaces/api/userFace";

export function userReducer(state: UserType | null, action: UserAction) {

    switch (action.type) {
        case "addUser":
            return { ...action.payload } as UserType
        case "updateUser":
            if (state) {
                return { ...state, ...action.payload } as UserType
            } else return state
        case "removeUser":
            return null
        default:
            return state;
    }
}


export const useGetUser = () => {
    const data = useContext(UserContext)
    return data.user || false
}

export const useGetAccessToken = () => {
    const data = useContext(UserContext)
    return data.user?.token || false
}

export const useUserLoading = () => {
    const data = useContext(UserContext)
    return data.userLoading
}

export const useUserFetching = () => {
    const data = useContext(UserContext)
    return data.userFetching
}
