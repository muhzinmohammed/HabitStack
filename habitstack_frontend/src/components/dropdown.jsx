import React from "react";
import { useHabitContext } from "../hooks/useHabitContext";


const Dropdown = ({setcategory}) => {
    const {isEdit} = useHabitContext()
    const options = ["","Health","Academics","Productivity","Finance","Hobbies"];
    return(
        <div className={`drop ${isEdit ? 'editing' : ''}`}>    
            <select className="category" onChange={(e) => setcategory(e.target.value)}>
                {options.map((option,index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;