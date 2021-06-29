import React from 'react'



const AuthForm = (props) =>{

const {change, 
        submit,
        text,
        inputs:{
         username,
         password
           } } = props


     return(
      <div>
         <form onSubmit={submit}> 
             <input
              type='text'
              name='username'
              placeholder='username'
              onChange={change}
              value={username}
             />

            <input
              type='text'
              name='password'
              placeholder='password'
              onChange={change}
              value={password}
             />
             <button>{text}</button>
         </form>
             
      </div>
     )
}

export default AuthForm