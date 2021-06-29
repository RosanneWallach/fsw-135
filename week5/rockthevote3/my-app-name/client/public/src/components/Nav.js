import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/context';


const Nav = (props) =>{

  const {logOut} = useContext(UserContext)

  return(
      <div className='nav'>
         <Link className='navlink' to='/profile'>Profile</Link>
         <Link className='navlink' to='/public'>Public</Link>
         <button className='navlink' onClick={logOut}>LogOut</button>
      </div>
  )

}

export default Nav