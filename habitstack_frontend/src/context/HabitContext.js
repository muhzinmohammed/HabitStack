import {createContext,useReducer} from 'react'

export const HabitContext = createContext()

export const HabitReducer = (state,action) => {
    switch (action.type){
        case 'SET_HABITS':
            return {habits : action.payload}
        case 'CREATE_HABITS':
            return {habits: [action.payload, ...state.habits]}
        case 'DELETE_HABIT':
            return {habits: state.habits.filter((w) => w._id !== action.payload._id)}
        case 'MARK_AS_DONE':
            return {habits: state.habits.filter((w) => w._id !== action.payload._id)}
        case 'MARKED_AS_DONE':
            return {habits : action.payload}
        case 'DELETE_MARKEDHABIT':
            return {habits: state.habits.filter((w) => w._id !== action.payload._id)}
        default:
            return state
    }
}

export const HabitContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(HabitReducer,{habits:[]})
    return(
        <HabitContext.Provider value={{...state,dispatch}}>
            {children}
        </HabitContext.Provider>
    );
};
