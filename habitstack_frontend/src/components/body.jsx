import React from "react";
import Cards from './cards';
import Analytics from "./analytics";
import {useEffect} from 'react';
import { useHabitContext } from '../hooks/useHabitContext';


const Body = () => {
    const {name,habits,dispatch,current,editingCardId,token} = useHabitContext()

    useEffect(() => {
      const fetchHabits = async () => {
        let url = '/habit'
        console.log(current)
        if (current === 'Dashboard'){
          url = `/habit/dashboard`
        }
        if (current === 'Marked'){
          url = `/habit/marked?marked=true`
        }
        else if (current && current !== 'Dashboard' && current !== 'Marked' && current !== 'Habits'){
          url = `/habit/category?category=${current}`
        } 
        const response = await fetch(url,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
        
        if (response.ok){
          dispatch({type:'SET_HABITS', payload: json})
        }
      }
      fetchHabits();
    },[current,editingCardId,dispatch])
    return(
      <div className="main">
        <div className='main_container' >
          {current === 'Dashboard' && 
            (<div>
              <div className="welcome_container">
                <div className="welcome">
                  <h2>Hi {name},</h2>
                  <h1>Welcome back to HabitStack.</h1>
                </div>
                <div >
                  <h3 className="streak">Habit Streak: <span>10🔥</span></h3>
                </div>
              </div>
              <Analytics/>
              {habits.length>0 && <div className="welcome"><h2>Habits for the day...</h2></div>}
            </div>)}
            <div className='container'>
              {habits.length<=0 && current!="Dashboard"? 
                <div className="empty_container">
                  <h1>No habits yet</h1>
                </div> : (<div>
                  <div className="welcome">
                    <h2>{current=="Dashboard"? null:current}</h2>
                  </div>
                {habits.map((habit, index) => {
                return(
                  <Cards 
                    key = {habit._id}
                    index = {index}
                    _id = {habit._id} 
                    isEditing={editingCardId === habit._id}
                    category = {habit.category} 
                    habit = {habit.name} 
                    marked = {habit.marked}
                    start_time = {habit.start} 
                    end_time = {habit.end} 
                    days = {habit.day}/>
                )})}
                </div>)
              }
            </div>
        </div>
      </div>
    );
}

export default Body