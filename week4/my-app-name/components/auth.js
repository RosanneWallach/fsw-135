import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm'
import {UserContext} from '../context/context'

const initState = {
    username: '',
    password: ''
}



   


const Auth =()=>{
   
    
   const [input, setInput] = useState(initState)

   const [switchOption, setSwitchOption] = useState(false)
   const {register, login} = useContext(UserContext)
   

  

    const registerEvent = (e) =>{
     e.preventDefault()
     register(input)

    }


 
const changeEvent = (e) =>{
    const {name, value} = e.target
    setInput(prevInputs =>({
        ...prevInputs,
        [name]:value
    }))
  }

const loginEvent =(e)=>{
    e.preventDefault()
    login(input)
    
}


return(
    <div>
      <h1>Political Issues Blog and Vote!</h1>
      {!switchOption ? 
      
      <>
      <AuthForm
       change={changeEvent}
       submit={registerEvent}
       inputs={input}
       text="Register"

      />
      <p onClick={() => setSwitchOption(prevState => !prevState)}>Have an Account?</p>
      </>
      :
      <>
      <AuthForm
       change={changeEvent}
       submit={loginEvent}
       inputs={input}
       text='Sign in'

      />
      <p onClick={() => setSwitchOption(prevState => !prevState)}>Register to access Blog Here...</p>
      </>
    
    }
      

    

    </div>
)
}
export default Auth