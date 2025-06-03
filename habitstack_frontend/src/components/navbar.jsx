import React, { useEffect, useState } from "react";
import logo from "./resource/logo.svg";
import icon from "./resource/settings_icon.svg";
import user from "./resource/user.svg";
import search from "./resource/search.svg"
import { useHabitContext } from "../hooks/useHabitContext";
import { googleLogout } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () =>{

    const {setCurrent,dispatch,token} = useHabitContext()
    const[searchValue,setSearchValue] = useState("")
    const navigate = useNavigate()
    const handleLogout = () => {
        googleLogout()
        navigate("/login")
      };

    useEffect(() => {
        const fetchHabits = async () => {
            let url = '/habit'
            if(searchValue !== ""){
                url = "/habit/search/"+searchValue
            }
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.ok){
              dispatch({type:'SET_HABITS', payload: json})
            }
          }
          fetchHabits();
        },[searchValue])
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
                        placeholder="Search by Habit or Category"
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="utility">
                    <div className="logout">
                        <button onClick={() => {handleLogout()}}>
                            Log out
                        </button>
                    </div>
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