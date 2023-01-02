import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { ITask } from '../../interfaces/tasks' 
import { useAppDispatch } from '../../app/hooks';
import { addTask } from '../../features/tasks/taskSlice';
import { v4 as uuid } from "uuid";

export const TaskForm = () => {

  const { register, handleSubmit } = useForm<ITask>();
  const dispatch = useAppDispatch()

  const handleOnSubmit: SubmitHandler<ITask> = data => {
    let { title, description, completed } = data;
    let taskTemp = { id: uuid(), title, description, completed };
    dispatch(addTask(taskTemp))

    console.log(taskTemp);
  
  }

  return (
    <Fragment>
      <h3>Task Form</h3>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label>Title: <input {...register("title")} /></label>
        </div>
        <div>
          <label>Description: <input {...register("description")} /></label>
        </div>
        <div>
          <label>Completed: <input type={"checkbox"} {...register('completed')} /></label>
        </div>
        <div>
          <button type="submit"> + </button>
        </div>
      </form>
    </Fragment>
  )
}
