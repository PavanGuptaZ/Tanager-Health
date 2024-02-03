import { useQuery } from '@tanstack/react-query';
import { useGetAccessToken } from '../hooks';
import { useEffect } from 'react';

export const UserHomePage = () => {
    const token = useGetAccessToken()
    const getUsersQuery = useQuery({
        queryKey: ['getList'],
        queryFn: async () => {
            const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + '/user', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': "Bearer " + token,
                },
                credentials: "include",
            })
            return await responce.json()
        },
        enabled: !!token,

    })

    useEffect(() => {
        console.log(getUsersQuery.data)
    }, [getUsersQuery.data])
    return (
        <div>UserHomePage</div>
    )
}
