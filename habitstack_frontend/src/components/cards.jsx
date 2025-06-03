import React from "react";
import { useState } from "react";
import del from "./resource/del.svg"
import edit from "./resource/edit.svg"
import marked from "./resource/marked.svg"
import Dropdown from "./dropdown";
import { useHabitContext } from "../hooks/useHabitContext";


const Cards = ({ index, ...props}) =>{

    const {dispatch, setIsEdit, setEditingCardId,token} = useHabitContext()
    const [category, setCategory] = useState(props.category)
    const [name, setName] = useState(props.name)
    const [start, setStart] = useState(props.start)
    const [end, setEnd] = useState(props.end)
    const [day, setDay] = useState(props.days)
    const [error, setError] = useState(null)
    const daysofWeek = ['M','T','W','Th','F','S','Su'];
    const daysArray = props.days


    const handleEdit = () => {
        setEditingCardId(props._id)
        setIsEdit(true)
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

    function convertTimeToDate(timeStr) {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    
    const formatTime12Hour = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const handleDone = async (e) => {
        e.preventDefault()
        let start_time = convertTimeToDate(start)
        let end_time = convertTimeToDate(end)
        const habit = {category,name,start: start_time,end: end_time,day}
        const response = await fetch('/habit/edit/'+props._id,{
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
            setEditingCardId(null)
            setIsEdit(false)
            console.log("habit edited")
        }
    }
    const handleMarkAsDone = async () => {
        const response = await fetch('/habit/mark/'+props._id,{
            method:'POST',
            body: JSON.stringify({ marked: !props.marked }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        const json = await response.json()
        if (response.ok)
            {
                dispatch({type: 'SET_HABITS',payload: json})
            }
    }
        
    const handleDelete = async () => {
        const response = await fetch('/habit/'+props._id,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        const json = await response.json()
        if(response.ok)
        {
            console.log("habit deleted")
            dispatch({type: 'DELETE_HABIT',payload: json})
        }
    }
   

    return(
        <div className={`status ${props.isEditing ? 'editing' : ''}`} onDoubleClick={handleMarkAsDone} style={{ animationDelay: `${index * 0.1}s`}}>
            <div className="default">
                <div className="title">
                    <h1>{props.category}
                        {props.marked && < img src={marked}/>}
                    </h1>
                    <h2>{props.habit}</h2>
                </div>
                <div className="time">
                    <div className="start_time">
                        <h4>Starts At</h4>
                        <h3>
                            {formatTime12Hour(props.start_time)}
                        </h3>
                    </div>
                    <div className="end_time">
                        <h4>Ends At</h4>
                        <h3>{formatTime12Hour(props.end_time)}</h3>
                    </div>
                </div>
                <div className="card_end">
                    <div className="days">
                        <ul className="days">
                            {daysArray.map((day,index) => (
                                <li key={index}>{day}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="alter">
                <div className="title">
                    <div className="alter_head">
                        <h1>{props.category}</h1>
                        <div className="alter_head_but">
                            <button onClick={handleEdit}><img src={edit}/></button>
                            <button onClick={handleDelete}><img src={del}/></button>
                        </div>
                    </div>
                        <h2>{props.habit}</h2>
                </div>
               <h3>Double click to {props.marked ? 'unmark':'mark'} as done</h3>
            </div>
            {props.isEditing && (
            <form className="edit" onSubmit={handleDone}>
                <div className="title">
                    <h1>
                        <div className="edit_cat">
                            <label>
                                <Dropdown setcategory={setCategory}/>
                            </label>
                        </div>
                        <div className="done_but">
                            <button type="submit" >done</button>
                        </div>
                    </h1>
                    <h2>
                        <div className="edit_name">
                            <label>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                            </label>
                        </div>
                    </h2>
                </div>
                <div className="time">
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
                <div className="card_end">
                    <div className="edit_day">
                        {daysofWeek.map((day) => (
                            <label key={day}>
                                <input type="checkbox" onChange={handleDays} name={day} id={day}/>
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </form>
            )}
        </div>
    );
};

export default Cards;