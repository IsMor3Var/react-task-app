import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../interfaces/tasks";

const initialState: ITask[] = []

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push({ ...action.payload, completed: false, createAt: new Date() })
        },
        editTask: (state, action) => {
            const { id, title, description, start, end, skills } = action.payload;
            const taskFound = state.find(task => task.id === id );
            if(taskFound) {
                taskFound.title = title
                taskFound.description = description
                taskFound.start = start
                taskFound.end = end
                taskFound.updateAt = new Date()
                taskFound.skills = skills
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