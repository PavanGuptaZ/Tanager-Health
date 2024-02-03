import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import { userReducer } from './index.js';
import { useQuery } from '@tanstack/react-query';
import refreshApiFunction from '../apis/auth/RefreshApi.js';
import UserType from '../interfaces/api/userFace.js';
import PersonType from '../interfaces/api/personFace.js';

export const initialUserStage: UserType | null = null;
export interface UserAction { type: string, payload: Partial<UserType> | null }
const initialBlockStage: { person: boolean, personData: PersonType | null } = { person: false, personData: null };
type TypeUserContext = {
    user: UserType | null,
    dispatchData: ({ type, payload }: UserAction) => void,
    userLoading: boolean,
    userFetching: boolean
}
const initialUserContext = {
    user: null,
    dispatchData: () => { },
    userLoading: false,
    userFetching: false
}
type TypeBlockContext = {
    displayBlocks: typeof initialBlockStage,
    setDisplayBlocks: Dispatch<SetStateAction<{ person: boolean; personData: PersonType | null; }>>,
    personData: PersonType | null,
}
const initialBlockContext = {
    displayBlocks: initialBlockStage,
    setDisplayBlocks: () => { },
    personData: null,
}

export const UserContext = createContext<TypeUserContext>(initialUserContext)
export const BlocksContext = createContext<TypeBlockContext>(initialBlockContext)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, dispatchData] = useReducer<React.Reducer<UserType | null, UserAction>>(userReducer, initialUserStage)
    const [displayBlocks, setDisplayBlocks] = useState(initialBlockStage)

    const userQuery = useQuery({
        queryKey: ['refresh'],
        queryFn: () => refreshApiFunction(),
        refetchInterval: 50 * 60 * 1000
    })

    useEffect(() => {
        if (userQuery.data?.status === "success") {
            dispatchData({ type: 'addUser', payload: userQuery.data.user })
        }
    }, [userQuery.data])

    return (
        <UserContext.Provider value={{
            user: data,
            dispatchData,
            userLoading: userQuery.isLoading,
            userFetching: userQuery.isFetching
        }}>
            <BlocksContext.Provider value={{ displayBlocks, setDisplayBlocks, personData: displayBlocks.personData }}>
                {children}
            </BlocksContext.Provider>
        </UserContext.Provider>
    )
}
