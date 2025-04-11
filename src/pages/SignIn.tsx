import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/features/auth/authSlice'; // Adjust import if needed
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming you have a login API or logic for authentication
    // Replace this part with actual login logic (e.g., API call)
    const user = { name: 'John Doe', email }; // Simulate a user object

    // Dispatch setAuth to store the user info in Redux
    dispatch(setAuth({ user }));

    // Redirect the user to the admin dashboard or home page
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Sign In</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
        </div>

        <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
