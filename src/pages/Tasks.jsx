import React from 'react'
import TaskCreate from '../components/TaskCreate'
import TaskList from '../components/TaskList'
import '../styles/pages/Tasks.css'

const Tasks = () => {
    return (
        <>
            <section className='task'>
                <div className='container'>
                    <div className="task-wrap">
                        <h1>Список дел</h1>
                        <TaskCreate></TaskCreate>
                        <TaskList></TaskList>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tasks