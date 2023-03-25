import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterLists: []
};

const projectReducer = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectFilterLists: (state, action) => {
            state.filterLists = action.payload
        },
        removeFromFilterList: (state, action) => {
            state.filterLists = state.filterLists.filter(project => project != action.payload)
        },
        addToFilterList: (state, action) => {
            state.filterLists.push(action.payload)
        }

    }
});


export default projectReducer.reducer
export const { setProjectFilterLists, removeFromFilterList, addToFilterList } = projectReducer.actions
