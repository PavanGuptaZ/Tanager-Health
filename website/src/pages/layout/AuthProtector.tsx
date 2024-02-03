import { Outlet } from 'react-router-dom'
import { useGetUser, useUserLoading } from '../../hooks'
import { RegisterAndLoginPage } from '../RegisterAndLoginPage'
import { LoadingPage } from './LoadingPage'

export const AuthProtector = () => {
    const user = useGetUser()
    const loading = useUserLoading()


    if (loading) {
        return <LoadingPage />
    }

    return (
        <div style={{ backgroundColor: "#F3F4F8", minHeight: "calc(100vh - 241px)" }}>
            {user ? <Outlet /> : <RegisterAndLoginPage type='login' />}
        </div>
    )
}
