import { useState } from 'react'
import styles from './Login.module.css'
import PageNav from '../components/PageNav'

function Login() {

const [email,setEmail]=useState("jack@example.com")
const [password,setPassword]=useState("qwerty")

    return (
        <div className={styles.login}>
         <PageNav/>
           <form className={styles.form}>
              <div className={styles.row}>
                 <label htmlFor="email">Email address</label>
                 <input type="email"  id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

              </div>

              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} id='password'/>
              </div>

              <div>
                <button>Login</button>
              </div>
           </form>
        </div>
    )
}

export default Login
