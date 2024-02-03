import { useGetUser } from "../../hooks/index.js";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { RegisterAndLoginPage } from '../RegisterAndLoginPage.js'
import { WelcomePage } from '../WelcomePage.tsx'
import { UserHomePage } from '../UserHomePage.tsx'
import { AuthProtector } from "./AuthProtector.tsx";
import { NavigationBar } from '../../components/NavigationBar.tsx';
import { Footer } from '../../components/Footer.tsx';
import { useContext, useEffect } from 'react';
import { ProfilePage } from "../ProfilePage.tsx";
import { SettingPage } from "../SettingPage.tsx";
import { PageNotFound } from "../PageNotFound.tsx";
import { PersonPage } from "../PersonPage.tsx";
import { NewPersonBlock } from "../../components/Blocks/NewPersonBlock.tsx";
import { BlocksContext } from "../../hooks/ContextProvider.tsx";

export const DefaultLayout = () => {
    const user = useGetUser()
    const location = useLocation()
    const { displayBlocks } = useContext(BlocksContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <div className='fullbody'>
            <NavigationBar />
            <Routes>
                <Route path="/" element={user ? <Navigate to='/home' /> : <WelcomePage />} />
                <Route path="/login" element={<RegisterAndLoginPage type='login' />} />
                <Route path="/register" element={<RegisterAndLoginPage type='register' />} />
                <Route element={<AuthProtector />}>
                    <Route path="/home" element={<UserHomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingPage />} />
                    <Route path="/person/:id" element={<PersonPage />} />
                </Route>
                <Route path="*" element={<PageNotFound type='register' />} />
            </Routes>
            <Footer />
            {displayBlocks.person && <NewPersonBlock />}
        </div>
    )
}
