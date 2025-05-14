import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.init';
import { useLocation } from 'react-router';

const SignIn: React.FC = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      const result = await loginUser(email, password);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log(userData);
        toast.success('Successfully signed in!');

        setTimeout(() => {
          const role = userData.role?.toLowerCase();
          if (role === 'admin') {
            navigate('/');
            // navigate('/admin/dashboard');
          } else if (role === 'user') {
            const from = location.state?.from?.pathname || '/user/udashboard';
            navigate(from);
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        toast.error('User role not found in database.');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Login to your account</h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            handleSubmit({ email, password });
          }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Log In
          </button>

          <p className="text-center text-sm font-light text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/signUp" className="font-medium text-red-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
