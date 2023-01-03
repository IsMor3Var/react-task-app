import { TaskForm } from './components/Tasks/TaskForm';
import { TaskList } from './components/Tasks/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(): JSX.Element{
  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList/>} />
          <Route path='/create-task' element={<TaskForm/>} />
          <Route path='/edit-task/:id' element={<TaskForm/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
