import React from "react";
import { useState } from "react";
import { sidebarData } from "./sidebarData";
import Create from './create';


const Sidebar = () =>{
    const [showCreate,setShowCreate] = useState(false)
    const handleOpen = () => {
        setShowCreate(true)
    };
    const handleClose = () => {
        setShowCreate(false);
    };
    return(
        <>
        <aside className="sidebar">
            <div className="side_content">
                <button className="create" onClick={handleOpen}>+  Create</button>
                {showCreate && <Create onClose={handleClose}/>}
                <ul>
                    {sidebarData.map((val,key) => {
                        return(
                            <li id={(window.location.pathname == val.link)? "active":""} className="b_side" key={key} onClick={() => {window.location.pathname = val.link}}>
                                <img src={val.icon}/>
                                <p>{val.title}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
        
        </>
    );
};

export default Sidebar;