import React, { useEffect } from 'react'
import { useGetProjectListsQuery } from '../features/projectApi'
import SingleProject from './SingleProject'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectFilterLists } from '../features/projectSlice'
export default function Projects() {
    const { data, isSuccess } = useGetProjectListsQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProjectFilterLists(data?.map(project => project.projectName)))
    }, [isSuccess])
    return <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
            {data?.length && data.map(project => <SingleProject data={project} />)}
        </div>
    </div>
}
