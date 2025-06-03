import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Dropdown from "./dropdown";
import close from "./resource/close.svg"
import { useHabitContext } from "../hooks/useHabitContext";


const Create = ({onClose}) =>{

    const [position, setPosition] = useState({ x: 20, y: 160 });
    const [dragging, setDragging] = useState(false);
    const dragRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleClose = () => {
        setIsEdit(true)
        onClose();
    }

    useEffect(() => {
        setIsEdit(false)
    },[]);
    const {dispatch,setCurrent,setIsEdit,token} = useHabitContext()
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [error, setError] = useState(null)
    const [day, setDay] = useState([])
    const daysofWeek = ['M','T','W','Th','F','S','Su'];

    function convertTimeToDate(timeStr) {
        const [hours, minutes] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
      
    const handleDays = (e) => {
        const {name, checked} = e.target;
        setDay(prev => {
            if(checked){
                return [...prev, name];
            }
            else{
                return prev.filter(day => day !== name);
            }
        });
    }

    const handleEveryDay = () => {
        setDay([...daysofWeek]);
        daysofWeek.forEach((day) => {
            const checkbox = document.getElementById(day);
            if (checkbox) checkbox.checked = true;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        let start_time = convertTimeToDate(start)
        let end_time = convertTimeToDate(end)
        const habit = {category,name,start: start_time,end: end_time,day}

        const response = await fetch('/habit',{
            method:'POST',
            body:JSON.stringify(habit),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()
        if (!response.ok)
        {
            setError(json.error)
        }
        else{
            setCategory('')
            setEnd('')
            setName('')
            setStart('')
            setDay('')
            setError(null)
            handleClose()
            console.log("new habit added")
            dispatch({type: 'SET_HABITS', payload: json})
        }
        setCurrent('Dashboard')
    }
    return (
        <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="create_draggable"
        style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 1000,
            cursor: dragging ? "grabbing" : "grab"
        }}>
        <form className="create_cont" onSubmit={handleSubmit}>
            <div className="close_but">
                <button onClick={handleClose}><img src={close}/></button>
            </div>
            <div className="create_cat_1">
                <div className="create_cat">
                    <label>
                        Category <Dropdown setcategory={setCategory}/>
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
                        <label key={day}>
                            <input type="checkbox" onChange={handleDays} name={day} id={day}/>
                            <span>{day}</span>
                        </label>
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
        </div>
    )
};

export default Create;