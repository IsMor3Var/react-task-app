import { IField } from '../../interfaces/tasks';
import { v4 as uuid } from 'uuid';

export const TaskFieldArray = ({ fields, register, remove, append }:IField ) => {
  return (
    <>
      <label className="block text-sm font-bold mb-1" >Skills: </label>
      <div className='grid grid-cols-2 gap-1' >
        {fields.map((field, index) => {
            return (
              <div key={field.id} id={`skills.${index}`} >
                  <input className="p-2 rounded-md bg-zinc-600" {...register(`skills.${index}.name`)} />
                  <button className='bg-orange-600 px-2 py-1 rounded-md ml-2' type="button" onClick={() => remove(index)}>
                    X
                  </button>
              </div>
            );
          })}
        </div>
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
          New Skill
        </button>
      </div>
    </>
  )
}
