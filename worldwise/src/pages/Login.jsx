import { useContext,useEffect,useState } from 'react'
import styles from './Login.module.css'
import PageNav from '../components/PageNav'
import { AuthContext } from '../context/FakeAuthContext'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

function Login() {

const [email,setEmail]=useState("jack@example.com")
const [password,setPassword]=useState("qwerty")
const {login,isAutheticated}=useContext(AuthContext)
const navigate=useNavigate()
  function handleSubmit(e){
    e.preventDefault();
    login(email,password)
  }

  useEffect(function(){
    if(isAutheticated){
      navigate('/app/cities',{replace:true})
    }
  },[isAutheticated,navigate])

    return (
        <div className={styles.login}>
         <PageNav/>
           <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                 <label htmlFor="email">Email address</label>
                 <input type="email"  id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

              </div>

              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} id='password'/>
              </div>

              <div>
                <Button type='primary'>Login</Button>
              </div>
           </form>
        </div>
    )
}

export default Login
