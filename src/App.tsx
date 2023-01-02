import React, { Fragment } from 'react';
import { TaskForm } from './components/Tasks/TaskForm';
import { TaskList } from './components/Tasks/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(): JSX.Element{
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList/>} />
          <Route path='/create-task' element={<TaskForm/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
