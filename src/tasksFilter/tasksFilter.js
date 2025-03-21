import React, { useState } from "react";
import "./tasksFilter.css";
import PropTypes from "prop-types";

function TasksFilter({ footerButton = () => {} }) {
  const [select, setselect] = useState({
    All: true,
    Active: false,
    Completed: false,
  });

  const click = (e) => {
    setselect((selec) => {
      const a = { All: false, Active: false, Completed: false };
      // eslint-disable-next-line array-callback-return
      Object.keys(selec).map((key) => {
        if (key === e.target.textContent) {
          a[key] = !selec.key;
        }
      });
      return a;
    });
    footerButton(e.target.textContent);
  };

  return (
    <ul className="filters">
      <li>
        <button
          className={select.All ? "selected" : ""}
          type="button"
          onClick={click}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={select.Active ? "selected" : ""}
          type="button"
          onClick={click}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={select.Completed ? "selected" : ""}
          type="button"
          onClick={click}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  footerButton: PropTypes.func,
};

export default TasksFilter;
