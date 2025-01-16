import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import '../styles/components/TaskCreate.css';

const TaskCreate = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle('');
    }
  };

  return (
    <form className='task__form' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Создать задачу'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit' aria-label='Добавить задачу'>
        
      </button>
    </form>
  );
};

export default TaskCreate;
