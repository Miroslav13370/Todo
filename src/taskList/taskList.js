import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

function TaskList({
  tasks = [],
  onDelete = () => {},
  onToggleEditMode = () => {},
  onEditTask = () => {},
  onTogglePlay = () => {},
}) {
  return tasks.map(({ description, classWrapper, created, id, valueMin, valueSec, play }) => (
    <Task
      key={id}
      id={id}
      description={description}
      classWrapper={classWrapper}
      created={created}
      onDelete={onDelete}
      onToggleEditMode={onToggleEditMode}
      onEditTask={onEditTask}
      durationMs={(Number(valueMin) * 60 + Number(valueSec)) * 1000}
      onTogglePlay={onTogglePlay}
      play={play}
    />
  ));
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      classWrapper: PropTypes.string,
      created: PropTypes.number,
      id: PropTypes.number,
      valueMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      valueSec: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      play: PropTypes.bool,
    })
  ),
  onDelete: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  onEditTask: PropTypes.func,
  onTogglePlay: PropTypes.func,
};

export default TaskList;
