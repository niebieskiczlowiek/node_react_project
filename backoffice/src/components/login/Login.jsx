import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const loginRef = React.createRef();
    const passwordRef = React.createRef();

    const loginFn = async (e) => {
        e.preventDefault();

        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post('/api/login', { login, password });
        
        if (response.data.success) {
            sessionStorage.setItem('token', response.data.token);
            navigate('/panel');
        }
    };

    return(
        <div className="login-container">
            {/* <div className="login">
                <h1 className="header">Login</h1>
                <div className="form">
                        <div className="cell">
                            <label htmlFor="username">Username</label>
                            <div className="field">
                                <span class="material-symbols-outlined">person</span>
                                <input ref={loginRef} type="text" name="username" id="username" autoComplete='off'/>
                            </div>
                        </div>
                        <div className="cell">
                            <label htmlFor="password">Password</label>
                            <div className="field">
                                <span class="material-symbols-outlined">key</span>
                                <input ref={passwordRef} type="password" name="password" id="password" autoComplete='off'/>
                            </div>
                        </div>
                    <button onClick={e => loginFn(e)}>Login</button>
                </div>
            </div> */}
            <form>
                <h2>Backoffice</h2>
                <input ref={loginRef} type='text' placeholder='Email' />
                <input ref={passwordRef} type='password' placeholder='Password'/>
                <button onClick={e => loginFn(e)}>Login</button>
            </form>
        </div>
    );
}

export default Login;