import { act } from 'react'
import {createContext,useReducer, useState, useEffect} from 'react'

export const HabitContext = createContext()

export const HabitReducer = (state,action) => {
    switch (action.type){
        case 'SET_HABITS':
            return {habits : action.payload}
        case 'CREATE_HABITS':
            return {habits: action.payload}
        case 'DELETE_HABIT':
            return {habits: state.habits.filter((w) => w._id !== action.payload._id)}
        default:
            return state
    }
}

export const HabitContextProvider = ({children}) => {

    const token = localStorage.getItem('token');
    const [state,dispatch] = useReducer(HabitReducer,{habits:[]})
    const [current, setCurrent] = useState("Dashboard")
    const [isEdit, setIsEdit] = useState(false)
    const [editingCardId, setEditingCardId] = useState(null)
    const [name, setName] = useState(() => {
        return localStorage.getItem('name') || null;
      });
    useEffect(() => {
        if (name) {
          localStorage.setItem('name', name);
        } else {
          localStorage.removeItem('name');
        }
      }, [name]);
    return(
        <HabitContext.Provider value={
            {
                ...state,
                dispatch,
                setCurrent,
                current,
                setIsEdit,
                isEdit,
                setEditingCardId,
                editingCardId,
                setName,
                name,
                token
            }}>
            {children}
        </HabitContext.Provider>
    );
};
