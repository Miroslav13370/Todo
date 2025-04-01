import React, { useState } from 'react';
import TaskList from './taskList/taskList';
import NewTaskForm from './newTaskForm/newTaskForm';
import Footer from './footer/footer';
import './app.css';

function App() {
  const initialTasks = [
    {
      description: 'Completed task',
      classWrapper: 'completed',
      created: Date.now(),
      id: 1,
      valueMin: 43,
      valueSec: 24,
      play: true,
    },
    {
      description: 'Editing task',
      classWrapper: 'editing',
      created: Date.now(),
      id: 2,
      valueMin: 13,
      valueSec: 24,
      play: true,
    },
    {
      description: 'Active task',
      classWrapper: '',
      created: Date.now(),
      id: 3,
      valueMin: 1,
      valueSec: 1,
      play: true,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleTaskState = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== id) return task;

        if (task.classWrapper === 'editing' || task.classWrapper === 'completed') {
          return { ...task, classWrapper: '' };
        }

        return { ...task, classWrapper: 'completed' };
      })
    );
  };

  const handleAddTask = (title, minutes, seconds) => {
    const newTask = {
      description: title,
      classWrapper: '',
      created: Date.now(),
      id: Math.floor(Math.random() * 100000),
      valueMin: minutes,
      valueSec: seconds,
      play: true,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.classWrapper !== 'completed'));
  };

  const handleEditTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, classWrapper: 'editing' } : task))
    );
  };

  const handleTogglePlay = (id, isPlaying) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, play: isPlaying } : task))
    );
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.classWrapper === 'completed';
    if (filter === 'Active') return task.classWrapper !== 'completed';
    return true; // All
  });

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
          />
        </ul>
        <Footer onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} />
      </section>
    </section>
  );
}

export default App;
