import { Suspense, useState } from 'react'
import './App.css'
import { motion} from 'framer-motion';



function App() 
{
  const [registerData, setRegisterData] = useState({
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
      const response = await fetch('http://localhost:8000/register', {
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
          <form className='flex flex-col gap-2'>
            <input type="text" placeholder="Username" className='border-2 border-black p-2 rounded' />
            <input type="email" placeholder="Email" className='border-2 border-black p-2 rounded' />
            <input type="password" placeholder="Password" className='border-2 border-black p-2 rounded' />
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
