import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import http from '../https';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: http }),
    tagTypes: ['tasks','edittask'],

    endpoints: () => ({}),
})