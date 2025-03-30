import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasksFilter/tasksFilter';
import './footer.css';

function Footer({ footerButton = () => {}, clearAll = () => {} }) {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TasksFilter footerButton={footerButton} />
      <button className="clear-completed" onClick={clearAll} type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  footerButton: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
};

export default Footer;
