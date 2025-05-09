import React from "react";
import Cards from './cards';
import {useEffect } from 'react';
import { useHabitContext } from '../hooks/useHabitContext';


const Body = () => {
    const {habits,dispatch,current,searchValue} = useHabitContext()
    useEffect(() => {
      const fetchHabits = async () => {
        let url = '/habit'
        if(searchValue){
          url = `/habit/search/`+searchValue
        }
        if (current === 'Marked'){
          url = `/habit/marked?marked=true`
        }
        else if (current && current !== 'Dashboard' && current !== 'Marked'){
          url = `/habit/category?category=${current}`
        } 
        console.log(url)
        const response = await fetch(url)
        const json = await response.json()
        
        if (response.ok){
          dispatch({type:'SET_HABITS', payload: json})
        }
      }
      fetchHabits();
    },[current,dispatch])
    console.log(current)
    return(
        <div className='container' >
        {habits && habits.length>0? (habits.map((habit, index) => {
          return(
          <Cards 
            key = {habit._id}
            index = {index}
            _id = {habit._id} 
            category = {habit.category} 
            habit = {habit.name} 
            marked = {habit.marked}
            start_time = {habit.start} 
            end_time = {habit.end} 
            days = {habit.day}
          />
        )})): 
        <div className="empty_container">
          <h1>No habits yet</h1>
        </div> 
        }

      </div>
    );
}

export default Body