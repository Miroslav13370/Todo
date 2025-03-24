import React, { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ru } from "date-fns/locale";
import PropTypes from "prop-types";

function Task({
  clasWrpa = "",
  description = "",
  created = Date.now(),
  id = "",
  delElem = () => {},
  changeLine = () => {},
  changeTask = () => {},
}) {
  const [time, setTime] = useState(
    formatDistanceToNowStrict(created, { addSuffix: true, locale: ru }),
  );
  const [value, setValue] = useState(description);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDistanceToNowStrict(created, { addSuffix: true, locale: ru }));
    }, 1000);

    return () => clearInterval(interval);
  }, [created]);

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <li className={clasWrpa}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label htmlFor={`name+${id}`}>
          <span
            role="button"
            tabIndex={id}
            className="description"
            onClick={() => {
              changeLine(id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                changeLine(id);
              }
            }}
          >
            {value}
          </span>
          <span className="created">Создано: {time}</span>
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
          if (e.key === "Enter" || e.key === " ") {
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
};

export default Task;
