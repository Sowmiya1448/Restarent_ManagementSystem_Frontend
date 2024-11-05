import { createSlice } from '@reduxjs/toolkit'

const stuslice = createSlice({
    name: 'studentdata',
    initialState: [],
    reducers: {
        addstudent(state, action) {
            state.push(action.payload)
        },

        del(state, action) {
            state.splice(action.payload, 1)
        },

        updates(state, action) {
            
            state[action.payload.key] = action.payload.value

        }
    
    }
});
export const { addstudent, del, updates} = stuslice.actions
export default stuslice.reducer