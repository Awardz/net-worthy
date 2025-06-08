import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';
function App() {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register');
            }
            const data = await response.json();
            console.log('Registration successful:', data);
            alert(`Registration successful! User ID: ${data.id}`);
        }
        catch (error) {
            console.error('Error during registration:', error);
            if (error instanceof Error) {
                alert(`Registration failed: ${error.message}`);
            }
            else {
                alert('Registration failed: An unknown error occurred.');
            }
        }
    };
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('Login submitted');
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login');
            }
            const data = await response.json();
            console.log('Login successful:', data);
            alert(`Login successful! User ID: ${data.id}`);
        }
        catch (error) {
            console.error('Error during login:', error);
            if (error instanceof Error) {
                alert(`Login failed: ${error.message}`);
            }
            else {
                alert('Login failed: An unknown error occurred.');
            }
        }
        console.log('Login submitted');
    };
    return (_jsx("div", { className: "scroll-smooth min-h-screen w-screen bg-red-300 border-2 border-black flex flex-col gap-4 p-4 items-center justify-center", children: _jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, transition: { type: "spring", stiffness: 300 }, className: "w-full", children: _jsxs("div", { className: 'flex flex-row items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg', children: [_jsx("div", { className: 'flex flex-col items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg', children: _jsxs("div", { children: [_jsx("h2", { children: "Register" }), _jsxs("form", { className: 'flex flex-col gap-2', onSubmit: handleRegisterSubmit, children: [_jsx("input", { type: "email", name: "email", placeholder: "Email", className: 'border-2 border-black p-2 rounded', value: registerData.email, onChange: handleRegisterChange }), _jsx("input", { type: "password", name: 'password', placeholder: "Password", className: 'border-2 border-black p-2 rounded', value: registerData.password, onChange: handleRegisterChange }), _jsx("button", { type: "submit", className: 'bg-blue-500 text-white p-2 rounded', children: "Submit" })] })] }) }), _jsx("div", { className: 'flex flex-col items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg', children: _jsxs("div", { children: [_jsx("h2", { children: "Login" }), _jsxs("form", { className: 'flex flex-col gap-2', onSubmit: handleLoginSubmit, children: [_jsx("input", { type: "email", name: "email", placeholder: "Email", className: 'border-2 border-black p-2 rounded', value: loginData.email, onChange: handleLoginChange }), _jsx("input", { type: "password", name: 'password', placeholder: "Password", className: 'border-2 border-black p-2 rounded', value: loginData.password, onChange: handleLoginChange }), _jsx("button", { type: "submit", className: 'bg-blue-500 text-white p-2 rounded', children: "Submit" })] })] }) })] }) }) }));
}
export default App;
