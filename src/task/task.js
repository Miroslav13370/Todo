import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { setTimer, getCurrentTime, toPlay, toPause } from '../timer/timer';

function Task({
  clasWrpa = '',
  description = '',
  created = Date.now(),
  id = '',
  delElem = () => {},
  changeLine = () => {},
  changeTask = () => {},
  milSek = 0,
}) {
  const [time, setTime] = useState(
    formatDistanceToNowStrict(created, { addSuffix: true, locale: ru })
  );
  const [value, setValue] = useState(description);
  const [clock, setClock] = useState(getCurrentTime(id));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDistanceToNowStrict(created, { addSuffix: true, locale: ru }));
    }, 1000);
    return () => clearInterval(interval);
  }, [created]);

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setTimer(setClock, milSek, id);
    const int = setInterval(() => {
      setClock(getCurrentTime(id));
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [milSek, id]);

  return (
    <li className={clasWrpa}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label htmlFor={`name+${id}`}>
          <span
            role="button"
            tabIndex={id}
            className="title"
            onClick={() => {
              changeLine(id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                changeLine(id);
              }
            }}
          >
            {value}
          </span>
          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              aria-label="плей"
              onClick={() => {
                toPlay(id, setClock);
              }}
            />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="пауза"
              onClick={() => {
                toPause(id);
              }}
            />
            {clock}
          </span>
          <span className="description">Создано: {time}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label="Редактировать задачу"
          onClick={() => {
            changeTask(id);
          }}
        />
        <button
          className="icon icon-destroy"
          onClick={() => {
            delElem(id);
          }}
          type="button"
          aria-label="Удалить задачу"
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={description}
        id={`name+${id}`}
        onChange={changeValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            changeLine(id);
          }
        }}
      />
    </li>
  );
}

Task.propTypes = {
  clasWrpa: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.number,
  id: PropTypes.number,
  delElem: PropTypes.func,
  changeLine: PropTypes.func,
  changeTask: PropTypes.func,
  milSek: PropTypes.number,
};

export default Task;
