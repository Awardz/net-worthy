import { useState } from 'react'
import './App.css'
import { motion} from 'framer-motion';
import React from 'react';





function App() 
{
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) 
        {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      alert(`Registration successful! User ID: ${data.id}`);
    } catch (error) {
      console.error('Error during registration:', error);
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert('Registration failed: An unknown error occurred.');
      }
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    console.log('Login submitted');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
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
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert('Login failed: An unknown error occurred.');
      }
    }
    console.log('Login submitted');
  };

      

return (
 

    <div className="scroll-smooth min-h-screen w-screen bg-red-300 border-2 border-black flex flex-col gap-4 p-4 items-center justify-center">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full">  

        <div className='flex flex-row items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg'>
          <div>
          <h2>Register</h2>
          <form className='flex flex-col gap-2' onSubmit={handleRegisterSubmit}>
            <input type="email" name="email" placeholder="Email" className='border-2 border-black p-2 rounded'
            value={registerData.email}
            onChange={handleRegisterChange} />

            <input type="password" name='password' placeholder="Password" className='border-2 border-black p-2 rounded'
            value={registerData.password}
            onChange={handleRegisterChange} />

            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Submit</button>
          </form>
          </div>

        </div>

        <div className='flex flex-col items-center justify-center gap-4 border-2 border-black p-4 rounded-lg shadow-lg'>
          <div>
          <h2>Login</h2>
          <form className='flex flex-col gap-2' onSubmit={handleLoginSubmit}>
            <input type="email" name="email" placeholder="Email" className='border-2 border-black p-2 rounded' 
            value={loginData.email} 
            onChange={handleLoginChange}/>

            <input type="password" name='password' placeholder="Password" className='border-2 border-black p-2 rounded' 
            value={loginData.password} 
            onChange={handleLoginChange}/>

            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Submit</button>
          </form>
          </div>

        </div>

</div>


      </motion.div>
      </div>

)
}

export default App
