import React, { useState, useEffect } from 'react'
import { useGetProjectListsQuery } from '../features/projectApi'
import { useGetTeamListsQuery } from '../features/teamApi'
import { useAddNewTaskMutation } from '../features/taskApi'
import { useNavigate } from 'react-router-dom'
export default function AddForm() {
    const { data: projects } = useGetProjectListsQuery()
    const { data: teams } = useGetTeamListsQuery()
    const [addNewTask, { isSuccess }] = useAddNewTaskMutation()
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadLine] = useState('')
    const [member, setMember] = useState('')
    const [project, setProject] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        let teamMember = teams.find(team => team.id == parseInt(member))
        let specificProject = projects.find(pro => pro.id == parseInt(project))

        let task = { taskName, teamMember, project: specificProject, deadline }
        addNewTask(task)

    }
    return <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                Create Task for Your Team
            </h1>

            <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                <form className="space-y-6" onSubmit={submitHandler}>
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
                        <select name="teamMember" id="lws-teamMember" required onChange={(e) => setMember(e.target.value)}>
                            <option value={member} hidden selected  >Select Job</option>
                            {teams?.length ? teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>) : ''}

                        </select>
                    </div>
                    <div className="fieldContainer">
                        <label for="lws-projectName">Project Name</label>
                        <select id="lws-projectName" name="projectName" value={project} required onChange={(e) => setProject(e.target.value)}>
                            <option hidden selected >Select Project</option>
                            {projects?.length ? projects.map(project => <option key={project.id} value={project.id}>{project.projectName}</option>) : ''}

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
                        <button type="submit" className="lws-submit">Save</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
}
