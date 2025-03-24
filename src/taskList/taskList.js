import React from "react";
import PropTypes from "prop-types";
import Task from "../task/task";

function TaskList({
  tasks = [],
  delElem = () => {},
  changeLine = () => {},
  changeTask = () => {},
}) {
  const list = tasks.map(({ description, clasWrpa, created, id }) => {
    return (
      <Task
        description={description}
        clasWrpa={clasWrpa}
        created={created}
        key={id}
        id={id}
        delElem={delElem}
        changeLine={changeLine}
        changeTask={changeTask}
      />
    );
  });

  return list;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      clasWrpa: PropTypes.string,
      created: PropTypes.number,
      id: PropTypes.number,
    }),
  ),
  delElem: PropTypes.func,
  changeLine: PropTypes.func,
  changeTask: PropTypes.func,
};

export default TaskList;
