import React from 'react'
import Issue from './Issues'

const IssueList = (props)=>{
const {issue} = props
    return(
        <div>
            {issue.map(issues => <Issue {...issue} key={issue._id}/>)}
        </div>
    )
}

export default IssueList