import React from "react";
import Cards from './cards';
import {useEffect } from 'react';
import { useHabitContext } from '../hooks/useHabitContext';


const Body = () => {
    const {habits,dispatch} = useHabitContext()

    useEffect(() => {
        const fetchHabits = async () => {
          const response = await fetch('/habit')
          const json = await response.json()
    
          if (response.ok){
            dispatch({type:'SET_HABITS',payload: json})
          }
        }
        fetchHabits();
      },[])
    return(
        <div className='container'>
        {habits && habits.map((habit) => {
          return(
          <Cards _id={habit._id} catagory={habit.catagory} habit={habit.name} start_time={habit.start} end_time={habit.end} days={habit.day}/>
        )})}
      </div>
    );
}

export default Body