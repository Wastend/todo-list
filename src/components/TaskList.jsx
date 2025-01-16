import React, { useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, removeTask, updateTask } from '../store/taskSlice';
import '../styles/components/TaskList.css';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('all');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState('');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incomplete') {
            return !task.completed;
        }
        return true;
    });

    const handleEditClick = (task) => {
        if (editingTaskId === task.id) {
            dispatch(updateTask({ id: task.id, title: editingTaskTitle }));
            setEditingTaskId(null);
            setEditingTaskTitle('');
        } else {
            setEditingTaskId(task.id);
            setEditingTaskTitle(task.title);
        }
    };

    const handleInputChange = (e) => {
        setEditingTaskTitle(e.target.value);
    };

    return (
        <div className='task__list-wrap'>
            <div className="task__list-topbar">
                <button
                    type='button'
                    onClick={() => setFilter('all')}
                    className={`btn ${filter === 'all' ? 'active' : ''}`}>
                    Все
                </button>
                <button
                    type='button'
                    onClick={() => setFilter('completed')}
                    className={`btn1 ${filter === 'completed' ? 'active' : ''}`}>
                    Выполнено
                </button>
                <button
                    type='button'
                    onClick={() => setFilter('incomplete')}
                    className={`btn2 ${filter === 'incomplete' ? 'active' : ''}`}>
                    Не выполнено
                </button>
            </div>
            <ul className="task__list">
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                        <h5>Сегодня</h5>
                        <div className="task-info">
                            <button
                                className="task-status"
                                onClick={(e) => {
                                    if (editingTaskId !== task.id) {
                                        dispatch(toggleComplete(task.id));
                                    }
                                }}></button>
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editingTaskTitle}
                                    onChange={handleInputChange}
                                    autoFocus
                                />
                            ) : (
                                <p className={task.completed ? 'task-completed' : ''}>
                                    {task.title}
                                </p>
                            )}
                        </div>
                        <div className="task__tools">
                            <button
                                className={`task__tools-edit${editingTaskId === task.id ? ' active' : ''}`}
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(task);
                                }}
                            >
                                <p>Сохранить</p>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2H3C2.46957 2 1.96086 2.21071 1.58579 2.58579C1.21071 2.96086 1 3.46957 1 4V18C1 18.5304 1.21071 19.0391 1.58579 19.4142C1.96086 19.7893 2.46957 20 3 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V11" stroke="#30324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.375 1.62498C16.7728 1.22716 17.3124 1.00366 17.875 1.00366C18.4376 1.00366 18.9771 1.22716 19.375 1.62498C19.7728 2.02281 19.9963 2.56237 19.9963 3.12498C19.9963 3.68759 19.7728 4.22716 19.375 4.62498L10.362 13.639C10.1245 13.8762 9.83118 14.0499 9.50897 14.144L6.63597 14.984C6.54992 15.0091 6.45871 15.0106 6.37188 14.9883C6.28505 14.9661 6.2058 14.9209 6.14242 14.8575C6.07904 14.7942 6.03386 14.7149 6.01162 14.6281C5.98937 14.5412 5.99087 14.45 6.01597 14.364L6.85597 11.491C6.9505 11.169 7.12451 10.876 7.36197 10.639L16.375 1.62498Z" stroke="#30324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className='task__tools-remove'
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeTask(task.id));
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 2C5 1.46957 5.21071 0.960859 5.58579 0.585786C5.96086 0.210714 6.46957 0 7 0H13C13.5304 0 14.0391 0.210714 14.4142 0.585786C14.7893 0.960859 15 1.46957 15 2V4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5C20 5.26522 19.8946 5.51957 19.7071 5.70711C19.5196 5.89464 19.2652 6 19 6H17.931L17.064 18.142C17.0281 18.6466 16.8023 19.1188 16.4321 19.4636C16.0619 19.8083 15.5749 20 15.069 20H4.93C4.42414 20 3.93707 19.8083 3.56688 19.4636C3.1967 19.1188 2.97092 18.6466 2.935 18.142L2.07 6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H5V2ZM7 4H13V2H7V4ZM4.074 6L4.931 18H15.07L15.927 6H4.074ZM8 8C8.26522 8 8.51957 8.10536 8.70711 8.29289C8.89464 8.48043 9 8.73478 9 9V15C9 15.2652 8.89464 15.5196 8.70711 15.7071C8.51957 15.8946 8.26522 16 8 16C7.73478 16 7.48043 15.8946 7.29289 15.7071C7.10536 15.5196 7 15.2652 7 15V9C7 8.73478 7.10536 8.48043 7.29289 8.29289C7.48043 8.10536 7.73478 8 8 8ZM12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8Z" fill="#FF2F2F" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;