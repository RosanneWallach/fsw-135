import React, { useContext } from 'react'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import Issues from './Issues'
import {UserContext} from '../context/context'



const Profile = (props) =>{

    const {user: {username}, addIssue, issue} = useContext(UserContext)
    return(

        <div>
            <h1>Welcome {username}</h1>

            <h2>Enter New Issue</h2>
              
            <IssueForm
            addIssue={addIssue}
            />

            <h3>Your Posts</h3>
            <IssueList issue={issue} />
        </div>
        
        
    )
}

export default Profile