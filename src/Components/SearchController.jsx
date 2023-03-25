import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchValue } from '../features/taskSlice'
export default function SearchController() {
    const dispatch = useDispatch()
    const { search } = useSelector(state => state.task)
    const searchHandler = (e) => {
        dispatch(addSearchValue(e.target.value))
    }
    return <div className="flex-1 max-w-xs search-field group">
        <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
        <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" value={search} onChange={searchHandler} />
    </div>
}
