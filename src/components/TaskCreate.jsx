import React from 'react'
import '../styles/components/TaskCreate.css'

const TaskCreate = () => {
  return (
    <form className='task__form'>
        <input type="text" placeholder='Создать задачу' />
        <button type='submit'  aria-label='Добавить задачу'>

        </button>
    </form>
  )
}

export default TaskCreate