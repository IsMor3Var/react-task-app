import React, { Fragment } from 'react';
import { TaskForm } from './components/Tasks/TaskForm';
import { TaskList } from './components/Tasks/TaskList';

function App(): JSX.Element{
  return (
    <Fragment>
      <TaskForm/>
      <TaskList/>
    </Fragment>
  );
}

export default App;
