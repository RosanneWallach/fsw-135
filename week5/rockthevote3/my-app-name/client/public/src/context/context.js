import React, {useState} from 'react'
import axios from 'axios'



export const UserContext = React.createContext()

const userAxios = axios.create()

 userAxios.interceptors.request.use(config =>{
   const token = localStorage.getItem('token')
   config.headers.Authorization = `Bearer ${token}`
   return config
 }
   
    )

const UserProvider = (props) =>{

const initState = {
    user: JSON.parse(localStorage.getItem('user')) ||{},
    token: localStorage.getItem('token') ||'',
    issue:[]
}
const [userState, setUserState] = useState(initState)

const register = (credentials) =>{
    console.log(credentials)
   axios.post('http://localhost:8080/auth/register', credentials)
   .then(res =>{
       console.log(res.data)
       const {newUser,token} = res.data
       localStorage.setItem('token', token)
       localStorage.setItem('user', JSON.stringify(newUser))
    setUserState(prev =>({
        ...prev,
        user: newUser,
        token
    }))})
    .catch(err => {
        if(err.stringify && err.response.date && err.response.data.errMsg){
            console.log(err.response.data.errMsg)
        }
    })
   
}
const login = (credentials) =>{
    axios.post('http://localhost:8080/auth/login', credentials)
    .then(res =>{
        const {user,token} = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        getUserIssue()
     setUserState(prev =>({
         ...prev,
         user: user,
         token
     }))})
        .catch(err =>{
            console.log(err)
        })
 }
const logOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUserState({
        user:{},
        token:'',
        issue:[]
        
    })
}
const getUserIssue = () =>{
    userAxios.get('http://localhost:8080/api/post')
    .then(res => {
        setUserState(prev => ({
            ...prev,
            issue: res.data

        }))
    })
    .catch(err => console.log(err))
}
const addIssue = (newIssue) =>{
  userAxios.post('http://localhost:8080/api/post', newIssue)
  .then(res => {
      setUserState(prev =>({
          ...prev,
             issue:[...prev.issue, res.data]
      }))
  })
  .catch(err => console.log(err))
    
}
return(
    <UserContext.Provider
    value={{
        ...userState,
        register,
        login,
        logOut,
        addIssue,
        getUserIssue
    }}
    >
        {props.children}
    </UserContext.Provider>
)


}

export default UserProvider