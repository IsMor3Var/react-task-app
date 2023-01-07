import { IField } from '../../interfaces/tasks';
import { v4 as uuid } from 'uuid';

export const TaskFieldArray = ({ fields, register, remove, append }:IField ) => {
  return (
    <div>
      {fields.map((field, index) => {
          return (
            <div key={field.id}>
                <input
                  className=" bg-zinc-800" 
                  placeholder="name"
                  {...register(`skill.${index}.name`)}
                />
                <button 
                  className='bg-orange-600 px-2 py-1 rounded-md' 
                  type="button" onClick={() => remove(index)}>
                  X
                </button>
            </div>
          );
        })}
      <div className='flex gap-x-2 mt-2'>
        <button
          className='bg-orange-600 px-2 py-1 rounded-md'  
          type="button"
          onClick={() =>
            append({
              id: uuid(),
              name: '',
            })
          }
        >
          +
        </button>
      </div>
    </div>
  )
}
