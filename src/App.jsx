import React, { useState, useEffect } from 'react';
import TaskList from './taskList/taskList';
import NewTaskForm from './newTaskForm/newTaskForm';
import Footer from './footer/footer';
import './app.css';
import data from './data/data';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    setTasks(data);
  }, []);

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
