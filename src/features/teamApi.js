
import { api } from '../features/apiSlice'


const teamApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTeamLists: build.query({
            query: () => '/team',
        }),
    }),

})
export const { useGetTeamListsQuery } = teamApi
