import './Menu.css'
import {routes} from "../utils /routes";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const Menu = () =>{
    const [isOpenMenu,setIsOpenMenu] = useState(false)
    return(
        <div className="menu">
            <div className={isOpenMenu ? "openMenu" : "closeMenu"}>
                <NavLink exact to={routes.home}>Tasks</NavLink>
                <NavLink exact to={routes.completed}>Completed</NavLink>
                <NavLink exact to={routes.trashList}>Trash</NavLink>
            </div>
            <button className="openBtn" onClick={()=>setIsOpenMenu(prev=>!prev)}>|</button>
        </div>
    )
}
export default Menu