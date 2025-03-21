import React, { useState } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ addElem = () => {} }) {
  const [value, setValue] = useState("");
  const cangeValue = (e) => {
    const a = e.target.value;
    setValue(() => {
      return a;
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    addElem(value);
    setValue("");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        placeholder="What needs to be done?"
        className="new-todo"
        onChange={cangeValue}
        value={value}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  addElem: PropTypes.func.isRequired,
};

export default NewTaskForm;
