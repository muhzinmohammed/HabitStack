import React from "react";

const Dropdown = ({setcategory}) => {
    const options = ["","Health","Academics","Productivity","Finance","Hobbies"];
    return(
        <div className="drop">    
            <select className="category" onChange={(e) => setcategory(e.target.value)}>
                {options.map((option,index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;