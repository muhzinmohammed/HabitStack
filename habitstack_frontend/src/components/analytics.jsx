import React from 'react'
import { useEffect, useState } from 'react'
import { useHabitContext } from '../hooks/useHabitContext'
import BarGraph from './Bar'

const Analytics = () => {
    const [count,setCount] = useState([]);
    const [todayCount,setTodayCount] = useState([]);
    const [markedCount,setMarkedCount] = useState([]);
    const [category,setCategory] = useState([])
    const [todayCategory,setTodayCategory] = useState([])
    const [markedCategory,setMarkedCategory] = useState([])
    const {dispatch} = useHabitContext()
    useEffect(() => {
        const fetchHabit = async () => {
            const response = await fetch('/habit/count')
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setCount(habitCount)
              setCategory(habitCategory)
              console.log(habitCount)
            }
          }
        const fetchTodayHabit = async () => {
            const response = await fetch('/habit/count/today')
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setTodayCount(habitCount)
              setTodayCategory(habitCategory)
              console.log(habitCount)
            }
          }
        const fetchMarked = async () => {
            const response = await fetch('/habit/count/marked')
            const data = await response.json()
            const habitCount = data.map(item => item.count);
            const habitCategory = data.map(item => item.category)
            if (response.ok){
              setMarkedCount(habitCount)
              setMarkedCategory(habitCategory)
              console.log(habitCount)
            }
          }
          fetchHabit();
          fetchTodayHabit();
          fetchMarked();
    },[dispatch])
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
            <h3>Marked As Done</h3>
            <BarGraph count={markedCount} category= {markedCategory}/>
        </div>
    </div>
  )
}

export default Analytics
