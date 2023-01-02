import { useAppSelector } from '../../app/hooks';
import { Fragment } from 'react';

export const TaskList = () => {

  const tasksList = useAppSelector(state => state.tasks )

  return (
    <Fragment>
      <h3>Tasks List</h3>
      <ul>
        { tasksList.map( task => (
            <li key={ task.id }> { task.title } - { task.description } </li>
        )) }
      </ul>
    </Fragment>
  )
}
