import React from "react";
import del from "./resource/del.svg"
import edit from "./resource/edit.svg"
import { useHabitContext } from "../hooks/useHabitContext";

const Cards = (props) =>{
    const {dispatch} = useHabitContext()

    const handleDelete = async () => {
        const response = await fetch('/habit/'+props._id,{
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok)
        {
            console.log("deleted")
            dispatch({type: 'DELETE_HABIT',payload: json})
        }
    }

    const handleMarkAsDone = async () => {
        const habitData = {
            catagory: props.catagory,
            name: props.habit,
            start: props.start_time,
            end: props.end_time,
            day: props.days
        }
        const response = await fetch('/habit/mark/'+props._id,{
            method:'POST',
            body: JSON.stringify(habitData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if (response.ok)
        {
            console.log("marked as done")
            dispatch({type: 'MARK_AS_DONE',payload: json})
        }
        
    }
    const daysArray = props.days
    return(
        <div className="status">
        <button onDoubleClick={handleMarkAsDone}>
            <div className="default">
                <div className="title">
                    <h1>{props.catagory}</h1>
                    <h2>{props.habit}</h2>
                </div>
                <div className="time">
                    <div className="start_time">
                        <h4>Starts At</h4>
                        <h3>{props.start_time}<span>   AM</span></h3>
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
                        <h1>{props.catagory}</h1>
                        <div className="alter_head_but">
                            <button><img src={edit}/></button>
                            <button onClick={handleDelete}><img src={del}/></button>
                        </div>
                    </div>
                        <h2>{props.habit}</h2>
                </div>
               <h3>Double click to mark as done</h3>
            </div>
        </button>
        </div>
    );
};

export default Cards;