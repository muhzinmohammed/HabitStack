import React from 'react'
import { useEffect, useState } from 'react'
import { useHabitContext } from '../hooks/useHabitContext'
import BarGraph from './Bar'

const Analytics = () => {
    const [count,setCount] = useState([]);
    const [todayCount,setTodayCount] = useState([]);
    const [habitsByDayCount,setHabitsByDayCount] = useState([]);
    const [markedCount,setMarkedCount] = useState([]);
    const [category,setCategory] = useState([])
    const [todayCategory,setTodayCategory] = useState([])
    const [markedCategory,setMarkedCategory] = useState([])
    const [habitDay,setHabitDay] = useState([])
    const {dispatch,token,habits} = useHabitContext()
    useEffect(() => {
        const fetchHabit = async () => {
            const response = await fetch('/habit/count',{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'appliction/json'
              }
          })
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setCount(habitCount)
              setCategory(habitCategory)
            }
          }
        const fetchTodayHabit = async () => {
            const response = await fetch('/habit/count/today',{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'appliction/json'
              }
          })
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setTodayCount(habitCount)
              setTodayCategory(habitCategory)
            }
          }
        const fetchHabitsByDay = async () => {
            const response = await fetch('/habit/count/habitsByDay',{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'appliction/json'
              }
          })
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitDay = data.map(item => item.day)
            if (response.ok){
              setHabitsByDayCount(habitCount)
              setHabitDay(habitDay)
            }
          }
        const fetchMarked = async () => {
            const response = await fetch('/habit/count/marked',{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'appliction/json'
              }
          })
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setMarkedCount(habitCount)
              setMarkedCategory(habitCategory)
            }
          }
          fetchHabit();
          fetchTodayHabit();
          fetchHabitsByDay();
          fetchMarked();
    },[dispatch,habits])
  return (
    <div className='analytics'>
        <div>
            <h3>All Habits</h3>
            <BarGraph count={count} category= {category}/>
        </div>
        <div>
            <h3>Habits For The Day</h3>
            <BarGraph count={todayCount} category= {todayCategory}/>
        </div>
        <div>
            <h3>Habits By Day</h3>
            <BarGraph count={habitsByDayCount} category= {habitDay}/>
        </div>
        <div>
            <h3>Marked As Done</h3>
            <BarGraph count={markedCount} category= {markedCategory}/>
        </div>
    </div>
  )
}

export default Analytics
