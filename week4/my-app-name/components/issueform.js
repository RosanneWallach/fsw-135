import React, {useState} from 'react'

const initState = {
    title:'',
    issue:'',
}

const IssueForm = (props) =>{
const {addIssue} = props
const [input, setInput] = useState(initState)

const submitEvent = (e)=>{
  e.preventDefault()
  addIssue(input)
  setInput(initState)
}

const {title, issue} = input

    return(
        <div>
            <form onSubmit={submitEvent}>
                <input 
                type='text'
                name='title'
                placeholder='title'
                onChange={(e) => setInput(e.target.value)}
                value={title}
                
                />
                <br/><br/>

                <label>Issue:</label>
                <textarea 
                  id="issue" 
                  name="issue" 
                  rows="6" 
                  cols="60"
                  placeholder='Enter Issue'
                  onChange={(e) => setInput(e.target.value)}
                  value={issue}
                  />
                  

                <button>Submit</button>

            </form>
        </div>
    )

}

export default IssueForm