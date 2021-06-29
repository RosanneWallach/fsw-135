import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/context';


const Nav = (props) =>{

  const {logout, token} = props

  return(
      <div className='nav'>
         {token && <Link className='navlink' to='/profile'>Profile</Link>}
         <Link className='navlink' to='/public'>Public</Link>
         { token && <button className='navlink' onClick={logout}>LogOut</button>}
      </div>
  )

}

export default Nav