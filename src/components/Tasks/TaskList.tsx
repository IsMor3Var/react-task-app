import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteTask, completeTask } from '../../features/tasks/taskSlice';
import { formatDates } from '../../helpers/date';
import { Link } from 'react-router-dom';

export const TaskList = () => {

  const tasksList = useAppSelector(state => state.tasks )
  const dispatch = useAppDispatch();

  const handleOnDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  const handleCompletedTask = (id: string) => {
    dispatch(completeTask(id))
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
            <div key={ task.id } className={`bg-neutral-800 p-4 ${task.completed ? 'border-double border-sky-500 border-4' : 'border-2 border-dotted border-red-500'}`} >
              <header className='flex justify-between'>
                <h3 className={ task.completed ? 'line-through decoration-double' : ''} >{ task.title }</h3>
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
              <div className='flex gap-x-2 mt-3 mb-3 justify-center rounded-md'>
                <p className='text-xs opacity-60 italic'> Start: { formatDates(task.start) }</p>
                <p className='text-xs opacity-60 italic'> End: { formatDates(task.end) }</p>
              </div>
              <div className='flex gap-x-2 bg-neutral-700 justify-center rounded-md'>
                <p className='truncate p-2'>{ task.description }</p>
              </div>
              <div className='flex gap-x-2 mt-2'>
                <label className="block text-xs font-bold mb-2" htmlFor={`completed.[${task.id}]`} >Completed: </label>
                <input 
                  type={"checkbox"} 
                  id={`completed.[${task.id}]`} 
                  name={`completed.[${task.id}]`}
                  className="rounded-md bg-zinc-600 mb-2" 
                  onChange={ ()=> handleCompletedTask(task.id) }
                  checked={ task.completed } 
                />
              </div>
              <p className='text-xs opacity-60 italic'>Create: { formatDates(task.createAt) }</p>
              { task.updateAt &&  <p className='text-xs opacity-60 italic'>Update: { formatDates(task.updateAt) }</p> }
            </div>
        )) }
      </div>
    </div>
  )
}
