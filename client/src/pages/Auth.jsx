import  { useState } from 'react';
import {callAuthLoginApi, callAuthRegisterApi } from '../api/authServices';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', phone: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isSignup) {
      try {
        const response = await callAuthRegisterApi(formData);
        if(response){
          console.log(response)
          toast.message("Logged in sucesssfully !!")
         
          navigate("/select-role")
        }
        else{
          console.log("Not getting register details")
        }
        
      } catch (error) {
        console.log("Error in callAuthRegisterApi !!")
        
      }
      
    } else {
      try {
        const response = await callAuthLoginApi(formData.email , formData.password);
        if(response){
          console.log(response)
          toast.message("Logged in sucesssfully !!")
          navigate(`/${response.user.role}/dashboard`)
        }
        
        
      } catch (error) {
        console.log("Error in callAuthLoginApi !!")
        
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? 'Create Account' : 'Login to Your Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isSignup ? 'Login here' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
