import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
// adjust path to your Firebase config
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.init';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe(); // clean up
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signIn'); // redirect to sign-in page after logout
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-10 flex items-center justify-between p-5 shadow-lg">
      <Link to="/">
        <img
          className="h-[50px] w-45 md:w-[250px]"
          src="../assets/logo.png"
          alt="cycle-sphere-logo"
        />
      </Link>

      <ul className="hidden space-x-6 md:flex">
        <li>
          <Link to="/" className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/allBicycles"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            All Bicycles
          </Link>
        </li>
        <li>
          <Link
            to="/aboutUs"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            About Us
          </Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link
              to="/orders"
              className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
            >
              Orders
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/checkout"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            Checkout
          </Link>
        </li>
      </ul>

      <div className="flex">
        {!isAuthenticated && (
          <Button asChild className="hidden md:block">
            <Link to="/signUp">Sign Up</Link>
          </Button>
        )}

        {isAuthenticated ? (
          <Button onClick={handleSignOut} className="ml-3 hidden md:block">
            Sign Out
          </Button>
        ) : (
          <Button asChild className="ml-3 hidden md:block">
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
        <span
          className={`my-1 block h-1 w-6 transform bg-black transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`my-1 block h-1 w-6 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`my-1 block h-1 w-6 transform bg-black transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/5 bg-white p-8 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul>
          <li>
            <Link
              to="/"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allBicycles"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              All Bicycles
            </Link>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              About Us
            </Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link
                to="/orders"
                className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
              >
                Orders
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/checkout"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Checkout
            </Link>
          </li>
        </ul>

        {!isAuthenticated && (
          <Button asChild className="mt-4">
            <Link to="/signUp">Sign Up</Link>
          </Button>
        )}

        {isAuthenticated ? (
          <Button onClick={handleSignOut} className="mt-4">
            Sign Out
          </Button>
        ) : (
          <Button asChild className="mt-4">
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
