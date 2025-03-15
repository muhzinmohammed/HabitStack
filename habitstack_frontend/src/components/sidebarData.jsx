import React from 'react'
import health from "./resource/health.svg";
import dashboard from "./resource/dashboard.svg";
import academics from "./resource/academics.svg";
import productivity from "./resource/productivity.svg";
import finance from "./resource/finance.svg";
import hobbies from "./resource/hobbies.svg";

export const sidebarData = [
    {
        title: 'Dashboard',
        icon: dashboard,
        link: "/"
    },
    {
        title: 'Fitness & Health',
        icon: health,
        link: "/FitnessHealth"
    },
    {
        title: 'Academics',
        icon: academics,
        link: "/Academics"
    },
    {
        title: 'Productivity',
        icon: productivity,
        link: "/Productivity"
    },
    {
        title: 'Finance',
        icon: finance,
        link: "/Finance"
    },
    {
        title: 'Hobbies',
        icon: hobbies,
        link: "/Hobbies"
    },
    {
        title: 'Marked as done',
        icon: hobbies,
        link: "/marked"
    }
] 


