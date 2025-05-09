import React, { useContext, useState } from "react";
import logo from "./resource/logo.svg";
import icon from "./resource/settings_icon.svg";
import user from "./resource/user.svg";
import search from "./resource/search.svg"
import { useHabitContext } from "../hooks/useHabitContext";
const Navbar = () =>{

    const {setSearchValue,setCurrent} = useHabitContext()

    return(
        <div className="navbar" >
            <div className="contents">
                <div className="logo">
                    <button onClick={() => setCurrent("Dashboard")}>
                        <div className="logo_pic">
                            <img src={logo} className="lo"/>
                        </div>
                    </button>
                    <div className="logo_name">
                        <h1>HabitStack</h1>
                    </div>
                </div>
                <div className="searchBar">
                    <div className="searchContainer">
                        <img src={search} className="searchIcon" />
                        <input 
                        type="search" 
                        className="search" 
                        placeholder="Search Habit"
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="utility">
                    <div className="settings">
                        <button className="but_nav">
                            <img src={icon}/>
                        </button>
                    </div>
                    <div className="profile">
                        <button className="but_nav">
                            <img src = {user}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;