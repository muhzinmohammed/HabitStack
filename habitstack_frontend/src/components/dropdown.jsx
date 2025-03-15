import React from "react";

const Dropdown = ({setCatagory}) => {
    const options = ["","Fitness & Health","Academics","Productivity","Finance","Hobbies"];
    return(
        <div className="drop">    
            <select className="catagory" onChange={(e) => setCatagory(e.target.value)}>
                {options.map((option,index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;