import React from 'react'
import health from "./resource/health.svg";
import dashboard from "./resource/dashboard.svg";
import academics from "./resource/academics.svg";
import productivity from "./resource/productivity.svg";
import finance from "./resource/finance.svg";
import hobbies from "./resource/hobbies.svg";
import marked from "./resource/marked_black.svg"
import Habits from "./resource/Habits.svg"
export const sidebarData = [
    {
        title: 'Dashboard',
        icon: dashboard,
        type: 'Dashboard'
    },
    {
        title: 'All Habits',
        icon: Habits,
        type: 'Habits'
    },
    {
        title: 'Health',
        icon: health,
        type: 'Health'
    },
    {
        title: 'Academics',
        icon: academics,
        type: 'Academics'
    },
    {
        title: 'Productivity',
        icon: productivity,
        type: 'Productivity'    },
    {
        title: 'Finance',
        type: 'Finance',
        icon: finance
    },
    {
        title: 'Hobbies',
        type: 'Hobbies',
        icon: hobbies
    },
    {
        title: 'Marked as done',
        type: 'Marked',
        icon: marked,
    }
] 


