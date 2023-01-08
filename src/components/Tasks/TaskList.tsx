import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteTask, completeTask } from '../../features/tasks/taskSlice';
import { formatDates } from '../../helpers/date';
import { Link } from 'react-router-dom';
import { ITask, ITypesGroup } from '../../interfaces/tasks';
import { useEffect, useState, ChangeEvent } from 'react';


export const TaskList = () => {
  const TYPE_RADIO: ITypesGroup = { 
    0: 'ALL-RADIO',
    1: 'COMPLETED-RADIO',
    2: 'INCOMPLETE-RADIO'
  }
  
  const [taskFilter, setTaskFilter] = useState<ITask[]>([]);
  const [toggleCompleted, setToggleCompleted] = useState<string>(TYPE_RADIO[0]);

  const tasksList = useAppSelector(state => state.tasks )
  const dispatch = useAppDispatch();

  const handleOnDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  const handleCompletedTask = (id: string) => {
    dispatch(completeTask(id))
  }

  useEffect(() => {
    setTaskFilter(tasksList);
    
    if(toggleCompleted === TYPE_RADIO[0] ){
      setTaskFilter(tasksList);
    } 
    if(toggleCompleted === TYPE_RADIO[1] ){
      let taskCompleted = tasksList.filter(task => task.completed === true);
      setTaskFilter(taskCompleted);
    }
    if(toggleCompleted === TYPE_RADIO[2] ){
      let taskCompleted = tasksList.filter(task => task.completed === false);
      setTaskFilter(taskCompleted);
    }
    // eslint-disable-next-line
  }, [tasksList, toggleCompleted])

  const handleOnChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    let valueRadio = e.target.value;
    setToggleCompleted(valueRadio);
  }

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1> {taskFilter.length > 1 ? 'Tasks' : 'Task'} - {taskFilter.length}</h1>
        <div className="flex flex-wrap">
          <div className="flex items-center mr-4">
              <label htmlFor="all-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All </label>
              <input
                checked={toggleCompleted === TYPE_RADIO[0] ? true : false} 
                id="all-radio" 
                type="radio" 
                value={TYPE_RADIO[0]} 
                name={TYPE_RADIO[0]}
                onChange={handleOnChangeRadio} 
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1" 
              />
          </div>
          <div className="flex items-center mr-4">
              <label htmlFor="completed-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed </label>
              <input
                checked={toggleCompleted === TYPE_RADIO[1] ? true : false} 
                id="completed-radio" 
                type="radio" 
                value={TYPE_RADIO[1]} 
                name={TYPE_RADIO[1]}
                onChange={handleOnChangeRadio} 
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  ml-1" 
              />
          </div>
          <div className="flex items-center mr-4">
              <label htmlFor="incomplete-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Incomplete </label>
              <input 
                checked={toggleCompleted === TYPE_RADIO[2] ? true : false}
                id="incomplete-radio" 
                type="radio" 
                value={TYPE_RADIO[2]} 
                name={TYPE_RADIO[2]}
                onChange={handleOnChangeRadio} 
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1" 
              />
          </div>
        </div>
        <Link 
          to={'/create-task'}
          className='bg-indigo-600 px-2 py-1 rounded-sm text-sm' 
        > Create Task </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        { taskFilter.map( task => ( 
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
