import React from 'react'
import Projects from './Projects'
import Team from './Team'
import Tasks from './Tasks'
export default function SideBar() {
    return <div className="container relative">
        <div className="sidebar">
            <Projects />
            <Team />
        </div>
        <Tasks />

    </div>
}