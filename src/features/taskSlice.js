import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: ''
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addSearchValue: (state, action) => {
            state.search = action.payload
        },


    }
});


export default taskSlice.reducer
export const { addSearchValue } = taskSlice.actions
