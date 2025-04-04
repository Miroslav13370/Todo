import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { setTimer, getCurrentTime, toPlay, toPause } from '../timer/timer';

function Task({
  classWrapper = '',
  description = '',
  created = Date.now(),
  id = '',
  onDelete = () => {},
  onToggleEditMode = () => {},
  onEditTask = () => {},
  durationMs = 0,
}) {
  const [createdTimeText, setCreatedTimeText] = useState(
    formatDistanceToNowStrict(created, { addSuffix: true, locale: ru })
  );

  const [taskTitle, setTaskTitle] = useState(description);
  const [timerDisplay, setTimerDisplay] = useState(getCurrentTime(id));

  // Обновление "создано X назад"
  useEffect(() => {
    const interval = setInterval(() => {
      setCreatedTimeText(formatDistanceToNowStrict(created, { addSuffix: true, locale: ru }));
    }, 1000);
    return () => clearInterval(interval);
  }, [created]);

  // Таймер
  useEffect(() => {
    setTimer(setTimerDisplay, durationMs, id);
    const interval = setInterval(() => {
      setTimerDisplay(getCurrentTime(id));
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMs, id]);

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };
  // Кнопки функции

  const handleChangeEdit = () => {
    onToggleEditMode(id);
  };
  const handleChangeEditEnter = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onToggleEditMode(id);
    }
  };
  const handleChangePause = () => {
    toPause(id);
  };
  const handleChangePlay = () => {
    toPlay(id, setTimerDisplay);
  };

  const handleDelTask = () => {
    onDelete(id);
  };
  const handleChangeTask = () => {
    onEditTask(id);
  };

  return (
    <li className={classWrapper}>
      <div className="view">
        <input className="toggle" type="checkbox" readOnly />

        <label htmlFor={`name+${id}`}>
          <span
            role="button"
            tabIndex={0}
            className="title"
            onClick={handleChangeEdit}
            onKeyDown={handleChangeEditEnter}
          >
            {taskTitle}
          </span>

          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              aria-label="плей"
              onClick={handleChangePlay}
            />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="пауза"
              onClick={handleChangePause}
            />
            {timerDisplay}
          </span>

          <span className="description">Создано: {createdTimeText}</span>
        </label>

        <button
          className="icon icon-edit"
          type="button"
          aria-label="Редактировать задачу"
          onClick={handleChangeTask}
        />

        <button
          className="icon icon-destroy"
          type="button"
          aria-label="Удалить задачу"
          onClick={handleDelTask}
        />
      </div>

      <input
        type="text"
        className="edit"
        defaultValue={description}
        id={`name+${id}`}
        onChange={handleInputChange}
        onKeyDown={handleChangeEditEnter}
      />
    </li>
  );
}

Task.propTypes = {
  classWrapper: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.number,
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  onEditTask: PropTypes.func,
  durationMs: PropTypes.number,
};

export default Task;
