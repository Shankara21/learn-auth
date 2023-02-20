import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken()
        getUsers()
    }, [])

    const refreshToken = async () => {
        try {
            const res = await axios.get('http://localhost:3000/users/refreshToken');
            setToken(res.data.accessToken)
            const decoded = jwt_decode(res.data.accessToken)
            setName(decoded.fullname)
            setExpire(decoded.exp)
        } catch (error) {
            if (error.response) {
                navigate('/')
            }
        }
    }
    const axiosJwt = axios.create()
    axiosJwt.interceptors.request.use(async (config) => {
        const currentDate = new Date().getTime() / 1000;
        if (currentDate >= expire) {
            const res = await axios.get('http://localhost:3000/users/refreshToken');
            config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            setToken(res.data.accessToken)
            const decoded = jwt_decode(res.data.accessToken)
            setName(decoded.fullname)
            setExpire(decoded.exp)
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    const getUsers = async () => {
        try {
            const res = await axiosJwt.get('http://localhost:3000/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message)
            }
        }
    }
    return (
        <div className='container mt-5'>
            <h1 className='title'>Welcome Back : {name} </h1>
            <button className='button is-info' onClick={getUsers}>Get Users</button>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>username</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
