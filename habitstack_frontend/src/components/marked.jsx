import React from "react";
import MarkedCards from './cards';
import {useEffect } from 'react';
import { useHabitContext } from '../hooks/useHabitContext';


const Marked = () => {
    const {habits,dispatch} = useHabitContext()

    useEffect(() => {
        const fetchHabits = async () => {
          const response = await fetch('/habit/marked')
          const json = await response.json()
    
          if (response.ok){
            console.log("mark as done recieved")
            dispatch({type:'MARKED_AS_DONE',payload: json})
          }
        }
        fetchHabits();
      },[])
    return(
        <div className='container'>
        {habits && habits.map((habit) => {
          return(
          <MarkedCards _id={habit._id} catagory={habit.catagory} habit={habit.name} start_time={habit.start} end_time={habit.end} days={habit.day}/>
        )})}
      </div>
    );
}

export default Marked