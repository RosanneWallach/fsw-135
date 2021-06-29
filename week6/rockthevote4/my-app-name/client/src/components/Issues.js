import React from 'react'
import IssueList from './IssueList'

const Issues = (props)=>{
const {title, issue, _id} = props


    return(
        <div>
            <h1>{title}</h1>
            <p>{issue}</p>

        </div>
    )
}

export default Issues