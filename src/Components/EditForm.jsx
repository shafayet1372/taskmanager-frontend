import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleTaskQuery, useUpdateTaskMutation } from '../features/taskApi'
import { useGetProjectListsQuery } from '../features/projectApi'
import { useGetTeamListsQuery } from '../features/teamApi'
import { useNavigate } from 'react-router-dom'
export default function EditForm() {
    const { id } = useParams()
    const { data } = useGetSingleTaskQuery(id)
    const { data: projects } = useGetProjectListsQuery()
    const { data: teams } = useGetTeamListsQuery()
    const [updateTask, { isSuccess }] = useUpdateTaskMutation()
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadLine] = useState('')
    const [member, setMember] = useState('')
    const [project, setProject] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.id) {
            const { taskName, project: { id: projectId }, teamMember: { id: memberId }, deadline } = data

            setTaskName(taskName)
            setProject(projectId)
            setMember(memberId)
            setDeadLine(deadline)
        }
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])
    const updateHandler = (e) => {

        e.preventDefault()
        let teamMember = teams.find(team => team.id == parseInt(member))
        let specificProject = projects.find(pro => pro.id == parseInt(project))

        let task = { taskName, teamMember, project: specificProject, deadline }
        updateTask({ id, data: task })


    }
    return <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Update Task
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={updateHandler}>
                <div className="fieldContainer">
                    <label for="lws-taskName">Task Name</label>
                    <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                    />
                </div>

                <div className="fieldContainer">
                    <label>Assign To</label>
                    <select name="teamMember" id="lws-teamMember" value={member} required onChange={(e) => setMember(e.target.value)}>

                        {teams?.length ? teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>) : ''}

                    </select>
                </div>
                <div className="fieldContainer">
                    <label for="lws-projectName">Project Name</label>
                    <select id="lws-projectName" name="projectName" required onChange={(e) => setProject(e.target.value)}>

                        {projects?.length ? projects.map(pro => <option key={pro.id} selected={project == pro.id} value={pro.id}>{pro.projectName}</option>) : ''}

                    </select>
                </div>

                <div className="fieldContainer">
                    <label for="lws-deadline">Deadline</label>
                    <input type="date" name="deadline" id="lws-deadline" required

                        value={deadline}
                        onChange={e => setDeadLine(e.target.value)}
                    />
                </div>

                <div className="text-right">
                    <button type="submit" className="lws-submit">Update</button>
                </div>
            </form>
        </div>
    </main>
}
