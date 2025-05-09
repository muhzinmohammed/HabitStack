import React from "react";
import { useState } from "react";
import { sidebarData } from "./sidebarData";
import { useHabitContext } from '../hooks/useHabitContext';

import Create from './create';


const Sidebar = () =>{
    const [showCreate,setShowCreate] = useState(false)
    const {current,setCurrent} = useHabitContext()
    return(
        <>
        <aside className="sidebar" >
            <div className="side_content">
                <button className="create" onClick={() => setShowCreate(true)}>+  Create</button>
                {showCreate && <Create onClose={() => setShowCreate(false)}/>}
                <ul>
                    {sidebarData.map((val,key) => {
                        return(
                            <li 
                                className={`b_side ${current === val.type ? 'active' : ''}`}
                                key={key} 
                                onClick={() => setCurrent(val.type)}>
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