import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase.init';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Fetch role from Firestore
        const userDocRef = doc(db, 'users', user.uid); // assumes user data is in "users" collection
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role); // expects "role" field to be in the user document
        }
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signIn');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const avatarLink = role === 'admin' ? '/admin/dashboard' : '/user/udashboard';

  return (
    <nav
      className={`flex h-24 w-full items-center justify-between bg-white p-5 shadow-lg transition-all duration-300 ease-in-out ${isSticky ? 'fixed top-0 left-0 z-50 shadow-md' : ''}`}
    >
      <Link to="/">
        <img className="h-[50px] w-45 md:w-[250px]" src="/logo.png" alt="cycle-sphere-logo" />
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
        <li>
          <Link
            to="/contact"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/checkout"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            Checkout
          </Link>
        </li>
        {isAuthenticated &&
          (role === 'admin' && (
            <li>
              <Link
                to="/admin/dashboard"
                className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
          ))}
        {isAuthenticated &&
          (role === 'admin' && (
            <li>
              <Link
                to="/admin/dashboard"
                className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
          ))}
      </ul>

      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <Button onClick={handleSignOut} className="ml-3 hidden md:block" variant={'red'}>
              Sign Out
            </Button>
            {role && (
              <Link to={avatarLink} className="ml-4 hidden md:block">
                <Avatar size="large" icon={<UserOutlined />} />
              </Link>
            )}
          </>
        ) : (
          <Button asChild className="ml-3 hidden md:block" variant={'red'}>
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
          <li>
            <Link
              to="/contact"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Checkout
            </Link>
          </li>
          {isAuthenticated &&
            (role === 'admin' && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
            ))}
        </ul>

        {isAuthenticated ? (
          <>
            <Button onClick={handleSignOut} className="mt-4" variant={'red'}>
              Sign Out
            </Button>
            {role && (
              <Link to={avatarLink} className="mt-4 inline-block">
                <Avatar size="large" icon={<UserOutlined />} />
              </Link>
            )}
          </>
        ) : (
          <Button asChild className="mt-4" variant={'red'}>
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
