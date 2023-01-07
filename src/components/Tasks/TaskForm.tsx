import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { ITask } from '../../interfaces/tasks' 
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask } from '../../features/tasks/taskSlice';
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { formatDates, formatHours } from '../../helpers/date';
import { TaskFieldArray } from './TaskFieldArray';

export const TaskForm = () => {
  const { register, handleSubmit, reset, control } = useForm<ITask>({
    mode: "onBlur"
  });
  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control
  });

  const tasksList = useAppSelector(state => state.tasks );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [taskEdit, setTaskEdit] = useState<ITask>();

  useEffect(() => {
    if( params.id ) setTaskEdit(tasksList.find((task) => task.id === params.id ));
  }, [params.id, tasksList])

  useEffect(() => {
    if(taskEdit) reset(taskEdit)
  }, [taskEdit, reset])

  const handleOnSubmit: SubmitHandler<ITask> = data => {
    let { title, description, start, end, skills } = data;
    
    if( params.id ) dispatch(editTask({ id: taskEdit?.id, title, description, start: new Date(start), end: new Date(end), skills }))
    else dispatch(addTask({ id: uuid(), title, description, start: new Date(start), end: new Date(end), skills }));
    navigate('/');
  }

  return (
      <form onSubmit={handleSubmit(handleOnSubmit)} >
        <div className="bg-zinc-800 p-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="title" >Title: </label>
            <input 
              {...register("title")} 
              id='title' 
              name='title'
              className="w-full p-2 rounded-md bg-zinc-600 mb-2" 
            />
            <div className="m-1 w-full">
              <label className="block text-sm font-bold mb-2" htmlFor="start" >Start: </label>
              <input 
                {...register("start")} 
                type='datetime-local'
                id='start' 
                name='start'
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
              />
              { taskEdit && <p className='text-xs w-full'>Date Before: { formatDates(taskEdit.start) } - { formatHours(taskEdit.start) } </p>}
            </div>
            <div className="m-1 w-full">
              <label className="block text-sm font-bold mb-2" htmlFor="end" >Finish: </label>
              <input 
                {...register("end")}
                type='datetime-local' 
                id='end' 
                name='end'
                className="w-full p-2 rounded-md bg-zinc-600 mb-2" 
              />
              { taskEdit && <p className='text-xs w-full'>Date Before: { formatDates(taskEdit.end) } - { formatHours(taskEdit.end) } </p>}
            </div>
          </div>

          <div className="m-1 w-full">
            <label className="block text-xs font-bold mb-2" htmlFor="description" >Description: </label>
            <textarea 
              {...register("description")} 
              id='description' 
              name='description' 
              className="w-full h-full p-2 rounded-md bg-zinc-600 mb-2"
            />
          </div>

          <div className="m-1 w-full col-span-2">
            <TaskFieldArray 
              fields={fields} 
              register={register} 
              remove={remove} 
              append={append}
            />
          </div>

          <div className='m-1 w-full col-span-2 flex gap-x-2'>
            <button
              className={ !params.id ? 'bg-indigo-600 px-2 py-1 rounded-md' : 'bg-orange-600 px-2 py-1 rounded-md' } 
              type="submit"
            > 
            { !params.id ? 'Save' : 'Edit' } 
            </button>
            <button
              className='bg-red-600 px-2 py-1 rounded-md' 
              onClick={ () => navigate('/') }
            > 
              Cancel 
            </button>
          </div>

        </div>
      </form>
  )
}
