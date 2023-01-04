import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../interfaces/tasks";
import { v4 as uuid } from 'uuid';

const initialState: ITask[] = [
    {
        id: uuid(),
        title: "Task 1",
        description: "I am description of the task 1",
        completed: false,
        createAt: new Date().toISOString().substring(0,10),
        updateAt: ''
    },
    {
        id: uuid(),
        title: "Task 2",
        description: "I am description of the task 2",
        completed: false,
        createAt: new Date().toISOString().substring(0,10),
        updateAt: ''
    },
    {
        id: uuid(),
        title: "Task 3",
        description: "I am description of the task 3",
        completed: true,
        createAt: new Date().toISOString().substring(0,10),
        updateAt: ''
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        editTask: (state, action) => {
            const { id, title, description } = action.payload;
            const taskFound = state.find(task => task.id === id );
            if(taskFound) {
                taskFound.title = title
                taskFound.description = description
            } 
        },
        deleteTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload )
            if(taskFound) state.splice(state.indexOf(taskFound), 1)
        },
        completeTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload )
            if(taskFound) taskFound.completed = !taskFound.completed
        }
    }
})

export const { addTask, deleteTask, editTask, completeTask } = taskSlice.actions
export default taskSlice.reducer