import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '@/redux/features/user/userApi';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const [addUser] = useAddUserMutation();
  const { createUser } = useAuth(); // From your Firebase context
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await createUser(email, password);
      const user = result.user;

      const now = new Date().toISOString();

      const dbUser = {
        name,
        email,
        password,
        role: 'user',
        photo: user.photoURL || null,
        createdAt: now,
        updatedAt: now,
      };

      const response = await addUser(dbUser);

      if ('error' in response) {
        console.error('Error from DB:', response.error);
        toast.error('Error saving user to database!');
        return;
      }

      toast.success('User registered successfully!');
      navigate('/');
    } catch (error: any) {
      console.error('Firebase error:', error);
      toast.error('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
            >
              Create an account
            </button>

            <p className="text-sm font-light text-gray-500">
              Already have an account?{' '}
              <Link to="/signIn" className="font-medium text-red-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
