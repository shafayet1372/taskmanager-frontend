import { configureStore } from '@reduxjs/toolkit';
import { api } from '../features/apiSlice';
import projectReducer from '../features/projectSlice';
import taskReducer from '../features/taskSlice'
export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
    [api.reducerPath]: api.reducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
