import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAddTask = () => {} }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskTitle, minutes, seconds);
    setTaskTitle('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        placeholder="Task"
        className="new-todo"
        onChange={handleTitleChange}
        value={taskTitle}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={handleMinutesChange}
        value={minutes}
        type="number"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={handleSecondsChange}
        value={seconds}
        type="number"
      />
      <button type="submit" style={{ display: 'none' }} aria-label="Submit task" />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
