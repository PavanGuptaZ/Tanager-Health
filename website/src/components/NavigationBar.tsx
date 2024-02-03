import { FaPhoneAlt, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Icon from '../assets/images/tanager.png';
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetUser } from "../hooks";
import { useContext } from "react";
import { UserContext } from "../hooks/ContextProvider";
import ApiFunction from "../apis/auth/RegisterAndLoginApi";
import { useQueryClient } from "@tanstack/react-query";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const NavigationBar = () => {
    const user = useGetUser()
    const queryClient = useQueryClient()
    const navigator = useNavigate()
    const { dispatchData } = useContext(UserContext)
    const hangleLogout = () => {
        ApiFunction('logout', {})
        dispatchData({ type: "removeUser", payload: null })
        queryClient.clear()
        navigator('/')
    }
    return (
        <nav className="NavigationBar">
            <div className="topContect widthControl">
                <div className="contectDetails"><FaPhoneAlt /> Frontdesk - +91 2598 84 14 555</div>
                <div className="socialIcons">
                    <FaFacebookF className="icon" />
                    <FaTwitter className="icon" />
                    <FaYoutube className="icon" />
                    <FaInstagram className="icon" />
                </div>
            </div>
            <div className="NavContent widthControl">
                <NavLink to={user ? '/home' : '/'} className="logoBox" >
                    <img src={Icon} alt="" height={'40px'} />
                    Tanager Health
                </NavLink>
                <div className="links">
                    {user ?
                        <>
                            <NavLink to='profile' className='NavLink'><CgProfile />Profile</NavLink>
                            <NavLink to='settings' className='NavLink'><IoIosSettings />settings</NavLink>
                            <button onClick={hangleLogout} className='NavLink logoutBTN' >Logout</button>
                        </> : <>
                            <NavLink to='login' className='NavLink'>Login</NavLink>
                            <NavLink to='register' className='NavLink'>Register</NavLink>
                        </>
                    }
                </div>
            </div>
        </nav >
    )
}
