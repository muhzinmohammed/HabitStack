import React from "react";
import del from "./resource/del.svg"
import edit from "./resource/edit.svg"
import marked from "./resource/marked.svg"
import { useHabitContext } from "../hooks/useHabitContext";

const Cards = ({ index, ...props}) =>{
    const {dispatch,current} = useHabitContext()

    const handleDelete = async () => {
        const response = await fetch('/habit/'+props._id,{
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok)
        {
            console.log("habit deleted")
            dispatch({type: 'DELETE_HABIT',payload: json})
        }
    }

    const handleMarkAsDone = async () => {
        const response = await fetch('/habit/mark/'+props._id,{
            method:'POST',
            body: JSON.stringify({ marked: !props.marked }),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if (response.ok)
        {
            dispatch({type: 'SET_HABITS',payload: json})
        }
    }

    const formatTime12Hour = (timeStr) => {
        const [hourStr, minute] = timeStr.split(":");
        let hour = parseInt(hourStr);
        const ampm = hour < 12 ? "AM" : "PM";
        hour = hour % 12 || 12; // convert 0 to 12
        return `${hour}:${minute} ${ampm}`;
    }
    const daysArray = props.days
    return(
        <div className="status" onDoubleClick={handleMarkAsDone} style={{ animationDelay: `${index * 0.1}s`}}>
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
                        <h3>{props.end_time}<span>   AM</span></h3>
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
                            <button><img src={edit}/></button>
                            <button onClick={handleDelete}><img src={del}/></button>
                        </div>
                    </div>
                        <h2>{props.habit}</h2>
                </div>
               <h3>Double click to {props.marked ? 'unmark':'mark'} as done</h3>
            </div>
        </div>
    );
};

export default Cards;