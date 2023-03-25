import React from 'react'
import { useGetTeamListsQuery } from '../features/teamApi'
import SingleTeamMember from './SingleTeamMember'
export default function Team() {
    const { data } = useGetTeamListsQuery()
    console.log(data)
    return <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <div className="mt-3 space-y-4">
            {data?.length && data.map(team => <SingleTeamMember data={team} />)}


        </div>
    </div>
}
