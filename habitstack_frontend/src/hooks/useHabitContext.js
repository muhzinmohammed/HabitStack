import { HabitContext } from "../context/HabitContext";
import { useContext } from "react";

export const useHabitContext = () =>{
    const context = useContext(HabitContext)

    if(!context){
        throw Error('no context found')
    }
    return context
}