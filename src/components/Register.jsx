import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const [msg, setMsg] = useState('')

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users/register', {
                username,
                fullname,
                email,
                password,
                confirmPassword
            });
            navigate('/')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth" >
                <div className="hero-body">
                    <div className="container" style={{ transform: 'translateY(-30px)' }}>
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">\
                                <form className='box' onSubmit={Register}>
                                    <p> {msg} </p>
                                    <div className="field mt-5">
                                        <div className="label"> Username</div>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="label"> Fullname</div>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder='Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="label"> Email</div>
                                        <div className="controls">
                                            <input type="email" className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="label">Password</div>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <div className="label">Confirm Password</div>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder='*******' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <p>Already have an account? <Link to="/">Login</Link></p>
                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Register</button>
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

export default Register
