
import { api } from '../features/apiSlice'


const taskApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query({
            query: () => '/tasks',
            providesTags: ['tasks']
        }),
        getSingleTask: build.query({
            query: (id) => `/tasks/${id}`,
        }),
        updateTaskStatus: build.mutation({
            query: ({ id: taskId, data }) => ({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['tasks']
        }),

        addNewTask: build.mutation({
            query: (data) => ({
                url: `/tasks`,
                method: 'POST',
                body: data

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    let response = await queryFulfilled
                    const patchResult = dispatch(
                        api.util.updateQueryData('getTaskList', undefined, (draft) => {

                            draft.push(response.data)
                        })
                    )

                } catch (e) {

                }
            },
        }),
        updateTask: build.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data

            }),

            // invalidatesTags: (result, error, arg) => [{ type: 'edittask', id: arg.id }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {


                try {
                    let response = await queryFulfilled
                    const patchResult = dispatch(
                        api.util.updateQueryData('getTaskList', undefined, (draft) => {

                            let updateDraft = draft.find(task => task.id == arg.id)
                            const { taskName, teamMember, deadline, project } = arg.data
                            updateDraft.taskName = taskName
                            updateDraft.teamMember = teamMember
                            updateDraft.deadline = deadline
                            updateDraft.project = project
                        })
                    )
                    dispatch(
                        api.util.updateQueryData('getSingleTask', arg.id.toString(), (draft) => {

                            let updateDraft = draft
                            const { taskName, teamMember, deadline, project } = arg.data
                            updateDraft.taskName = taskName
                            updateDraft.teamMember = teamMember
                            updateDraft.deadline = deadline
                            updateDraft.project = project
                        })
                    )



                } catch (e) {

                }
            },
        }),
        deleteTask: build.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {


                const patchResult = dispatch(
                    api.util.updateQueryData('getTaskList', undefined, (draft) => {

                        let index = draft.findIndex(task => task.id == arg)
                        draft.splice(index, 1)
                    })
                )

                try {
                    await queryFulfilled
                } catch (e) {
                    patchResult.undo()
                }
            },
        }),
    }),

})
export const { useGetTaskListQuery, useUpdateTaskStatusMutation, useDeleteTaskMutation, useAddNewTaskMutation, useGetSingleTaskQuery, useUpdateTaskMutation } = taskApi
