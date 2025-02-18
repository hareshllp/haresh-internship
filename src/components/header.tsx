import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeCookie } from 'typescript-cookie';
import { ToastContainer } from 'react-toastify';

import {logout} from "../services/auth.service";

type Props = {};


type Flags = {
    is_settings_dropdown_open: boolean,
    logout_loader: boolean
};

type Menus = {
    isDashboardActive : boolean,
    isSessionsActive : boolean,
    isProductsActive : boolean,
}

const Header =(props:Props) =>{

    const initFlags = {
        is_settings_dropdown_open: false,
        logout_loader:false
    };
    
    const [flags, setFlags] = useState<Flags>(initFlags);
    const initMenus = {
        isDashboardActive : false,
        isSessionsActive : false,
        isProductsActive : false,
    };
    const [menus, setMenus] = useState<Menus>(initMenus);
    const navigate = useNavigate();
    const location = useLocation();
    
    const toggleSettingsDropdown = () => {
        setFlags((prevState) => ({
          ...flags,
          is_settings_dropdown_open: !prevState.is_settings_dropdown_open
        })
        );
      }
    
    useEffect(() => {
        if(location.pathname === '/dashboard'){
           setMenus({...menus,isDashboardActive:true}) 
        }
        if(location.pathname === '/sessions'){
            setMenus({...menus,isSessionsActive:true}) 
        }
        if(location.pathname === '/products'){
            setMenus({...menus,isProductsActive:true}) 
        }
    },[]); 

      const handleLogout = (e: React.MouseEvent) => {
        setFlags({...flags,logout_loader:true});
        logout().then(
            res =>{
                removeCookie("authToken");
                removeCookie("loggedInUid");
                navigate('/login');
            },
            error => {
                alert('Something went wrong while logout');    
            }
        );
      }

    return(
        <>
        <div className="row">
        <div className="col-md-10">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={menus.isDashboardActive ? "nav-item active" : "nav-item"}>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className={menus.isSessionsActive ? "nav-item active" : "nav-item"}>
                        <Link to='/sessions'>Sessions</Link>
                    </li>
                    <li className={menus.isProductsActive ? "nav-item active" : "nav-item"}>
                        <Link to='/products'>Products</Link>
                    </li>
                </ul>    
                </div>
            </nav>

        </div>
        <div className="col-md-2">
        <div className="dropdown">
            <button className="btn settings-dropdown-button dropdown-toggle" onClick={toggleSettingsDropdown} type="button" id="dropdownMenuButton" aria-expanded="false">
            Settings
            </button>
            {flags.is_settings_dropdown_open &&
            <ul className="settings-dropdown-wrapper">
                <li className="settings-item">
                    <Link to={"/profile/edit"}>Edit Profile</Link>
                </li>
                <li className="settings-item">
                    <Link to={"/changePassword"}>Change Password</Link>   
                </li>
                <li className="settings-item">
                    <a onClick={handleLogout}> {flags.logout_loader && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )} Logout</a>
                </li>
            </ul>
            }
        </div>
        {/* <button >Logout</button> */}
        </div>
        </div>
        <ToastContainer />
       </> 
    )
}

export default Header;