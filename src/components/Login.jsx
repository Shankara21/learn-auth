import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [msg, setMsg] = useState('')

    const Login = async (e) => { 
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users/login', {
                email,
                password
            });
            navigate('/dashboard')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    }
    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form className='box' onSubmit={Login}>
                                    <p className='has-text-centered'> {msg} </p>
                                    <div className="field mt-5">
                                        <div className="label">Email or Username</div>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="label">Password</div>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <p>Doesn't have an account? <Link to="/register">Register</Link></p>
                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
