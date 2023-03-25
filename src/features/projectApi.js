
import { api } from '../features/apiSlice'


const projectApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProjectLists: build.query({
            query: () => '/projects',
        }),
    }),

})
export const { useGetProjectListsQuery } = projectApi
