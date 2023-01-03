import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { ITask } from '../../interfaces/tasks' 
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask } from '../../features/tasks/taskSlice';
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm<ITask>();
  const tasksList = useAppSelector(state => state.tasks );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [taskEdit, setTaskEdit] = useState<ITask>();

  useEffect(() => {
    if( params.id ) setTaskEdit(tasksList.find((task) => task.id === params.id ));
    // eslint-disable-next-line
  }, [params.id])

  useEffect(() => {
    if(taskEdit){
      reset({
        title: taskEdit.title,
        description: taskEdit.description,
        completed: taskEdit.completed
      })
    }
    // eslint-disable-next-line
  }, [taskEdit])

  const handleOnSubmit: SubmitHandler<ITask> = data => {
    let { title, description, completed } = data;
    if( params.id ){
      dispatch(editTask({ id: taskEdit?.id, title, description, completed }))
    }else{
      dispatch(addTask({ id: uuid(), title, description, completed }));
    }
    navigate('/');
  }

  return (
    <Fragment>
      <h3>Task Form</h3>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <label>Title: 
            <input 
              {...register("title")} 
              id='title' 
              name='title' 
            />
          </label>
        </div>
        <div>
          <label>Description: 
              <input 
                {...register("description")} 
                id='description' 
                name='description' 
              />
            </label>
        </div>
        <div>
          <label>Completed: 
            <input 
              type={"checkbox"} 
              {...register('completed')} 
              id='completed' 
              name='completed' 
            />
          </label>
        </div>
        <div>
          <button type="submit"> + </button>
        </div>
      </form>
    </Fragment>
  )
}
