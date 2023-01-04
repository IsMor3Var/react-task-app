import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteTask } from '../../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

export const TaskList = () => {

  const tasksList = useAppSelector(state => state.tasks )
  const dispatch = useAppDispatch();

  const handleOnDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1> {tasksList.length > 1 ? 'Tasks' : 'Task'} - {tasksList.length}</h1>
        <Link 
          to={'/create-task'}
          className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' 
        > Create Task </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        { tasksList.map( task => (
            <div key={ task.id } className="bg-neutral-800 p-4 rounded-md" >
              <header className='flex justify-between'>
                <h3>{ task.title }</h3>
                <div className='flex gap-x-2'>
                  <Link
                    className='bg-orange-500 px-2 py-1 text-xs rounded-md' 
                    to={`/edit-task/${task.id}`} 
                  >Edit</Link>
                  <button
                    className='bg-red-500 px-2 py-1 text-xs rounded-md' 
                    onClick={() => handleOnDelete(task.id)}
                    > Delete </button>
                </div>
              </header>
              <span>{ task.description }</span>
            </div>
        )) }
      </div>
    </div>
  )
}
