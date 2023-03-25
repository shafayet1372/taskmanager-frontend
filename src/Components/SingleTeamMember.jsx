import React from 'react'

export default function SingleTeamMember({ data }) {
    const { name, avatar, id } = data
    return <div className="checkbox-container">
        <img src={avatar} className="team-avater" />
        <p className="label">{name}</p>
    </div>

}
