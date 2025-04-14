import React, { useState, useEffect, useReducer } from 'react';
import TaskList from './taskList/taskList';
import NewTaskForm from './newTaskForm/newTaskForm';
import Footer from './footer/footer';
import './app.css';
import data from './data/data';

function App() {
  const [filter, setFilter] = useState('All');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'Initial':
        return action.dat();
      case 'Delete':
        return state.filter((task) => task.id !== action.id);
      case 'Toggle':
        return state.map((task) => {
          if (task.id === action.id) {
            return { ...task, modeEdit: action.mode === '' ? 'completed' : '' };
          }
          return task;
        });
      case 'Add': {
        const newTask = {
          description: action.title,
          modeEdit: '',
          created: Date.now(),
          id: Math.floor(Math.random() * 100000),
          valueSec: Number(action.seconds) + Number(action.minutes) * 60,
          play: true,
        };

        return [...state, newTask];
      }
      case 'ClearCompleted':
        return state.filter((task) => task.modeEdit !== 'completed');

      case 'Edit':
        return state.map((task) =>
          task.id === action.id ? { ...task, modeEdit: 'editing' } : task
        );

      case 'TogglePlay':
        return state.map((task) =>
          task.id === action.id ? { ...task, play: action.isPlaying } : task
        );
      case 'ChangeTitle':
        return state.map((task) => {
          if (task.id === action.id) {
            return { ...task, description: action.des };
          }
          return task;
        });

      default:
        return state;
    }
  };

  const [stateTask, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({
      type: 'Initial',
      dat: data,
    });
  }, []);

  const handleDeleteTask = (id) => {
    dispatch({
      type: 'Delete',
      id,
    });
  };

  const handleToggleTaskState = (id, mode) => {
    dispatch({
      type: 'Toggle',
      id,
      mode,
    });
  };

  const handleAddTask = (title, minutes, seconds) => {
    dispatch({
      type: 'Add',
      title,
      minutes,
      seconds,
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    dispatch({
      type: 'ClearCompleted',
    });
  };

  const handleEditTask = (id) => {
    dispatch({
      type: 'Edit',
      id,
    });
  };

  const handleTogglePlay = (id, isPlaying) => {
    dispatch({
      type: 'TogglePlay',
      id,
      isPlaying,
    });
  };

  const visibleTasks = stateTask.filter((task) => {
    if (filter === 'Completed') return task.modeEdit === 'completed';
    if (filter === 'Active') return task.modeEdit !== 'completed';
    return true;
  });

  const handleChangeTitle = (des, id) => {
    dispatch({
      type: 'ChangeTitle',
      id,
      des,
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            tasks={visibleTasks}
            onDelete={handleDeleteTask}
            onToggleEditMode={handleToggleTaskState}
            onEditTask={handleEditTask}
            onTogglePlay={handleTogglePlay}
            changeTitle={handleChangeTitle}
          />
        </ul>
        <Footer onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} />
      </section>
    </section>
  );
}

export default App;
