import './login.css'
import React, { useRef, useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useHabitContext } from '../hooks/useHabitContext'


const Login = () => {

    const navigate = useNavigate()
    const containerRef = useRef(null)

    const userRef = useRef()        
    const errRef = useRef()


    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[email,setEmail] = useState('')
    const [error, setError] = useState(null);       
    const {setName} = useHabitContext();
    
    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = userName;
        const v2 = password;

        console.log(v1)
        console.log(v2)
        if (!v1 || !v2) {
            setError("Invalid Entry");
            return;
        }
        try {
            const response = await fetch('/auth/register',{
                method:'POST',
                body:JSON.stringify({ userName,email,password }),
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            
            localStorage.setItem('token', data.token);
            setUserName(data.user.userName);
            setName(userName);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUserName('');
            setPassword('');
            setEmail('');
            
            navigate("/main");
        } catch (err) {
            if (err.message.includes('400')) {
                setError('User already exists');
            } else {
                setError('User Creation Failed');
            }
            errRef.current.focus();
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/login',{
                method: 'POST',
                body: JSON.stringify({ email, password}),
                headers: {
                     'Content-Type': 'application/json'
                },
            });
            
            const data = await response.json();
            // Store token and user data
            if (!response.ok) {
                throw new Error(response.status);
            }

            localStorage.setItem('token', data.token);
            console.log(data.user.userName);
            setUserName(data.user.userName);
            setName(data.user.userName);
            navigate("/main");
        } catch (err) {
            if (err.message.includes('400')) {
                setError("User does not exist. Try again.");
            } else if (err.message.includes('401')) {
                setError("Incorrect Password. Try again.");
            } else {
                setError('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleGoogleLogin = async (cred) => {
        try {
            const response = await fetch('/auth/google',{
                method: 'POST',
                body: JSON.stringify({
                    credential: cred.credential
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log(data.user.userName);
            setUserName(data.user.userName);
            setName(data.user.userName);
            navigate("/main");
        } catch (err) {
            setError('Google login failed');
            console.error('Login failed:', err);
        }
    }


    const handleSignUpContainer = () => {
	    containerRef.current.classList.add("right-panel-active");
    };
    const handleSignInContainer = () => {
	    containerRef.current.classList.remove("right-panel-active");
    };

  return (
    <div className='login'>
        <div className="container" ref={containerRef}>
        <p ref={errRef} className={error ? "errmsg" : "offscreen"}>
                {error}
            </p>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <input 
                        type="text" 
                        placeholder="User Name"
                        ref={userRef} 
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                            type="password"
                            id="password"
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    <p className='error'>{error? error:""}</p> 
                    <button type='submit'>Create Account</button>
                    <span>or</span>
                    <GoogleLogin 
                    onSuccess={(resp) => {handleGoogleLogin(resp)}}
                    onError={() => {console.log("login failed")}}/>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignIn}>
                    <h1>Sign in</h1>
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                            type="password"
                            id="password"
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    <p className='error'>{error? error:""}</p> 
                    <a href="#">Forgot your password?</a>
                    <button type='submit'>Sign In</button>
                    <span>or</span>
                    <GoogleLogin 
                    onSuccess={(resp) => {handleGoogleLogin(resp)}}
                    onError={() => {console.log("login failed")}}
                    auto_select={true}
                    useOneTap/>
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
