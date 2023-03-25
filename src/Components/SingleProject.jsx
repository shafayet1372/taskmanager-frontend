import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFilterList, addToFilterList } from '../features/projectSlice'
export default function SingleProject({ data }) {
    const dispatch = useDispatch()
    const { project } = useSelector(state => state)
    const { id, projectName, colorClass } = data

    const projectCheckedHandler = (e, value) => {
        if (project.filterLists.includes(value)) {
            dispatch(removeFromFilterList(value))
        } else {
            dispatch(addToFilterList(value))
        }
    }
    return <div className="checkbox-container">
        <input type="checkbox" className={`${colorClass}`} checked={project.filterLists?.includes(projectName)} onChange={(e) => projectCheckedHandler(e, projectName)} />
        <p className="label">{projectName}</p>
    </div>
}
