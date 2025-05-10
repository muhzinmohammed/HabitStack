import {createContext,useReducer, useState} from 'react'

export const HabitContext = createContext()

export const HabitReducer = (state,action) => {
    switch (action.type){
        case 'SET_HABITS':
            console.log(action.payload)
            return {habits : action.payload}
        case 'CREATE_HABITS':
            return {habits: [action.payload, ...state.habits]}
        case 'DELETE_HABIT':
            return {habits: state.habits.filter((w) => w._id !== action.payload._id)}
        default:
            return state
    }
}

export const HabitContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(HabitReducer,{habits:[]})
    const [current, setCurrent] = useState("Dashboard")
    const [isEdit, setIsEdit] = useState(false)
    const [editingCardId, setEditingCardId] = useState(null)
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
                editingCardId
            }}>
            {children}
        </HabitContext.Provider>
    );
};
