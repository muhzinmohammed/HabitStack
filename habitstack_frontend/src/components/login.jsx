import './login.css'
import React, { useRef } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useHabitContext } from '../hooks/useHabitContext'


const Login = () => {

    const navigate = useNavigate()
    const containerRef = useRef(null)
    const {setName} = useHabitContext()


    const handleSignUpContainer = () => {
	    containerRef.current.classList.add("right-panel-active");
    };
    const handleSignInContainer = () => {
	    containerRef.current.classList.remove("right-panel-active");
    };

    const handleLogin = (cred) => {
        const data = jwtDecode(cred.credential)
        const name = data.given_name
        setName(name)
        navigate("/main");
    }
  return (
    <div className='login'>
        <div className="container" ref={containerRef}>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Create Account</button>
                    <span>or</span>
                    <GoogleLogin 
                    onSuccess={(resp) => {handleLogin(resp)}}
                    onError={() => {console.log("login failed")}}/>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                    <span>or</span>
                    <GoogleLogin 
                    onSuccess={(resp) => {handleLogin(resp)}}
                    onError={() => {console.log("login failed")}}
                    auto_select={true}/>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Get started with your habit journey!</h1>
                        <p>Already have an account?</p>
                        <button className="ghost" onClick={handleSignInContainer}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Back again?, your habits are waiting.</h1>
                        <h4>Sign in to keep the progress rolling</h4>
                        <p>Don't have an Account?</p>
                        <button className="ghost" onClick={handleSignUpContainer}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
