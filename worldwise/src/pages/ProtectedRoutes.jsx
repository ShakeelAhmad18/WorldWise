import { useContext, useEffect } from "react"
import { AuthContext } from "../context/FakeAuthContext"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

ProtectedRoutes.propTypes={
  children: PropTypes.node.isRequired
}

function ProtectedRoutes({children}) {
const {isAutheticated}=useContext(AuthContext)
const navigate=useNavigate()

    useEffect(function(){
       if(!isAutheticated) navigate('/')
       
    },[isAutheticated,navigate])


    return isAutheticated ? children : null;
}

export default ProtectedRoutes;
