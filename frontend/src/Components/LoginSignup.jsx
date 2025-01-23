import axios from '../Config/axiosConfig';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate=useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [input, setInput] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
        setError(''); // Clear error on input change
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Login validation
            if (input.username === '' || input.password === '' ||input.username.length<=4||input.password.length<=4) {
                setError('Invalid credentials');
                return;
            }
            let user={
                username:input.username,
                password:input.password,
            }
            try{
                let response =await axios.post("/login",user);
                localStorage.setItem('jwt',response.data);
                console.log(localStorage.getItem('jwt'))
                navigate("/");
            }
            catch(error){
                
                setError("Oops you have entered wrong credentials");
            }

        } else {
            // Signup validation
            if (input.username.length <= 4) {
                setError('Username must be greater than 4 characters.');
                return;
            }
            
            if (input.password.length <= 4) {
                setError('Password must be greater than 4 characters.');
                return;
            }
            let user={
                username:input.username,
                password:input.password,
            }
            try {
                let response1 = await axios.post("/register", user);
                let response2 =await axios.post("/login",user);
                localStorage.setItem('jwt',response2.data);
                
                navigate("/");
                
            } catch (error) {
               if(error.response.status==409)
                setError("Username already taken");
               else
               setError("We have some issues at our side ,please retry")
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4', margin: 0 }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button onClick={toggleForm} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '10px', fontWeight: isLogin ? 'bold' : 'normal', color: isLogin ? '#5cb85c' : 'black' }}>
                        Login
                    </button>
                    <button onClick={toggleForm} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '10px', fontWeight: !isLogin ? 'bold' : 'normal', color: !isLogin ? '#5cb85c' : 'black' }}>
                        Signup
                    </button>
                </div>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: isLogin ? 'block' : 'none' }}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={input.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={input.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#5cb85c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                </form>
                <form onSubmit={handleSubmit} style={{ display: isLogin ? 'none' : 'block' }}>
                    <h2>Signup</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={input.username}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={input.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#5cb85c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Signup</button>
                </form>
            </div>
        </div>
    );
};

export default LoginSignup;