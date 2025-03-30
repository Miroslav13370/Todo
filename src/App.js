import React, { useState } from 'react';
import TaskList from './taskList/taskList';
import NewTaskForm from './newTaskForm/newTaskForm';
import Footer from './footer/footer';
import './app.css';

function App() {
  const arr = [
    {
      description: 'Completed task',
      clasWrpa: 'Completed',
      created: Date.now(),
      id: 1,
      valueMin: 43,
      valueSec: 24,
      play: true,
    },
    {
      description: 'Editing task',
      clasWrpa: '',
      created: Date.now(),
      id: 2,
      valueMin: 13,
      valueSec: 24,
      play: true,
    },
    {
      description: 'Active task',
      clasWrpa: '',
      created: Date.now(),
      id: 3,
      valueMin: 1,
      valueSec: 1,
      play: true,
    },
  ];

  const [tasks, setTasks] = useState(arr);
  const [filters, setFilter] = useState('all');
  const delElem = (ide) => setTasks((tas) => [...tas].filter(({ id }) => id !== ide));
  const changeLine = (num) => {
    setTasks((elems) => {
      return elems.map((elem) => {
        if (elem.id === num) {
          if (elem.clasWrpa === 'editing') {
            return { ...elem, clasWrpa: '' };
          }
          if (elem.clasWrpa === 'completed') {
            return { ...elem, clasWrpa: '' };
          }
          if (elem.clasWrpa !== 'completed' && elem.clasWrpa !== 'editing') {
            return { ...elem, clasWrpa: 'completed' };
          }
        }
        return elem;
      });
    });
  };
  const addElem = (value, Min, Sec) => {
    setTasks((elems) => {
      return [
        ...elems,
        {
          description: value,
          clasWrpa: '',
          created: Date.now(),
          id: Math.floor(Math.random() * 100000),
          valueMin: Min,
          valueSec: Sec,
          play: true,
        },
      ];
    });
  };
  const footerButton = (buttonState) => {
    setFilter(buttonState);
  };

  const filterTasks = tasks.filter((task) => {
    if (filters === 'Completed') {
      return task.clasWrpa === 'completed';
    }
    if (filters === 'Active') {
      return task.clasWrpa !== 'completed' || task.clasWrpa === 'editing';
    }
    return true;
  });

  const clearAll = () => {
    setTasks((task) => {
      return task.filter((elem) => {
        return elem.clasWrpa !== 'completed';
      });
    });
  };
  const changeTask = (id) => {
    setTasks((taski) => {
      return taski.map((task) => {
        return task.id === id ? { ...task, clasWrpa: 'editing' } : task;
      });
    });
  };

  const changePlay = (id, setPlay) => {
    setTasks((taski) => {
      return taski.map((task) => {
        return task.id === id ? { ...task, play: setPlay } : task;
      });
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addElem={addElem} />
      </header>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            tasks={filterTasks}
            delElem={delElem}
            changeLine={changeLine}
            changeTask={changeTask}
            changePlay={changePlay}
          />
        </ul>
        <Footer footerButton={footerButton} clearAll={clearAll} />
      </section>
    </section>
  );
}

export default App;
