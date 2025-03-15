import React from "react";
import { useState } from "react";
import Dropdown from "./dropdown";
import close from "./resource/close.svg"
import { useHabitContext } from "../hooks/useHabitContext";


const Create = ({onClose}) =>{
    const handleClose = () => {
        onClose();
    }
    const {dispatch} = useHabitContext()
    const [catagory,setCatagory] = useState()
    const [name,setName] = useState()
    const [start,setStart] = useState()
    const [end,setEnd] = useState()
    const [error,setError] = useState()
    const [day,setDay] = useState([])
    const daysofWeek = ['M','T','W','Th','F','S','Su'];
    const handleDays = (e) => {
        const {name,checked} = e.target;
        setDay(prev => {
            if(checked){
                return [...prev,name];
            }
            else{
                return prev.filter(day => day !== name);
            }
        });
    }
    const handleEveryDay = () => {
        setDay([...daysofWeek]); // Select all days
        daysofWeek.forEach((day) => {
            const checkbox = document.getElementById(day);
            if (checkbox) checkbox.checked = true; // Programmatically check all checkboxes
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        const habit = {catagory,name,start,end,day}

        const response = await fetch('/habit',{
            method:'POST',
            body:JSON.stringify(habit),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok)
        {
            setError(json.error)
        }
        else{
            setCatagory('')
            setEnd('')
            setName('')
            setStart('')
            setDay('')
            setError(null)
            handleClose()
            console.log("new habit added")
            dispatch({type: 'CREATE_HABITS', payload: json})
        }
    }

    return (
        <form className="create_cont" onSubmit={handleSubmit}>
            <div className="close_but">
                <button onClick={handleClose}><img src={close}/></button>
            </div>
            <div className="create_cat_1">
                <div className="create_cat">
                    <label>
                        Catagory<Dropdown setCatagory={setCatagory}/>
                    </label>
                </div>
                <div className="create_hab">
                    <label>
                        Habit <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    </label>
                </div>
                <div className="create_time">
                    <div className="start_t">
                        <label>
                            Start time <input type="time" onChange={(e) => setStart(e.target.value)} value={start}/>
                        </label>
                    </div>
                    <div className="end_t">
                        <label>
                            End time <input type="time" onChange={(e) => setEnd(e.target.value)} value={end}/>
                        </label>
                    </div>
                </div>
                <div className="create_day">
                    {daysofWeek.map((day) => (
                        <label key={day} ><input type="checkbox" onChange={handleDays} name={day} id={day}/><span>{day}</span></label>
                    ))}
                    <div className="ever_day">
                        <button type="button" onClick={handleEveryDay}>Every Day</button>
                    </div>
                </div>
                <div className="sub">
                    <button type="submit" className="create_submit">Create</button>
                </div>
            </div>
        </form>
    )
};

export default Create;