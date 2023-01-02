import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../interfaces/tasks";
import { v4 as uuid } from 'uuid';

const initialState: ITask[] = [
    {
        id: uuid(),
        title: "Task 1",
        description: "I am description of the task 1",
        completed: false
    },
    {
        id: uuid(),
        title: "Task 2",
        description: "I am description of the task 2",
        completed: false
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload )
            if(taskFound) state.splice(state.indexOf(taskFound), 1)
        }
    }
})

export const { addTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer