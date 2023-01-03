import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Fragment } from 'react';
import { deleteTask } from '../../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

export const TaskList = () => {

  const tasksList = useAppSelector(state => state.tasks )
  const dispatch = useAppDispatch();

  const handleOnDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  return (
    <Fragment>
      <header>
        <h1> {tasksList.length > 1 ? 'Tasks' : 'Task'} - {tasksList.length}</h1>
        <Link to={'/create-task'} > Create Task </Link>
      </header>
      <h3>Tasks List</h3>
      <ul>
        { tasksList.map( task => (
            <li key={ task.id }> 
              { task.title } - { task.description } 
              <button onClick={() => handleOnDelete(task.id)}> x </button>
              <Link to={`/edit-task/${task.id}`} >Edit</Link>
            </li>
        )) }
      </ul>
    </Fragment>
  )
}
