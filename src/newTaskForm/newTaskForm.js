import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ addElem = () => {} }) {
  const [value, setValue] = useState('');
  const [valueMin, setValueMin] = useState('');
  const [valueSec, setvalueSec] = useState('');
  const cangeValue = (e) => {
    setValue(() => {
      return e.target.value;
    });
  };

  const cangeValueMin = (e) => {
    setValueMin(() => {
      return e.target.value;
    });
  };

  const cangeValueSec = (e) => {
    setvalueSec(() => {
      return e.target.value;
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    addElem(value, valueMin, valueSec);
    setValue('');
    setValueMin('');
    setvalueSec('');
  };

  return (
    <form onSubmit={submitForm} className="new-todo-form">
      <input placeholder="Task" className="new-todo" onChange={cangeValue} value={value} />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={cangeValueMin}
        value={valueMin}
        type="number"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={cangeValueSec}
        value={valueSec}
        type="number"
      />
      <button type="submit" style={{ display: 'none' }} aria-label="отправка" />
    </form>
  );
}

NewTaskForm.propTypes = {
  addElem: PropTypes.func.isRequired,
};

export default NewTaskForm;
