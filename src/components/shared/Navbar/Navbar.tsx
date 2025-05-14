import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase.init';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

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

        {isAuthenticated && role === 'admin' && (
          <li>
            <Link
              to="/admin/dashboard"
              className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated && role === 'user' && (
          <>
            <li>
              <Link
                to="/checkout"
                className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
              >
                Checkout
              </Link>
            </li>
            <li>
              <Link
                to="/user/dashboard"
                className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <div
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              className="relative flex cursor-pointer items-center gap-2 rounded-full border-2 border-black p-1 hover:border-red-800 hover:text-red-800 lg:p-2"
            >
              <User />

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-md border bg-white p-4 text-sm shadow-lg">
                  {/* <p className="mb-1 font-semibold">{user?.name}</p> */}
                  {/* {role === 'admin' && (
                    <>
                      <Link to="/admin/profile">Profile</Link>
                    </>
                  )} */}
                  {role === 'user' && <Link to="/user/updatePassword">Profile</Link>}
                  {/* <p className="mb-3 text-gray-500">{session?.user?.email}</p> */}
                  <button
                    onClick={handleSignOut}
                    className="w-full cursor-pointer rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="flex cursor-pointer items-center gap-2 hover:text-red-800">
                <User />
                LogIn
              </button>
            </Link>
          </>
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

          {isAuthenticated && role === 'admin' && (
            <li>
              <Link
                to="/admin/dashboard"
                className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated && role === 'user' && (
            <>
              <li>
                <Link
                  to="/checkout"
                  className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <Link
                  to="/user/dashboard"
                  className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
        {isAuthenticated ? (
          <>
            <div
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              className="relative flex cursor-pointer items-center gap-2 rounded-full border-2 border-black p-1 hover:border-red-800 hover:text-red-800 lg:p-2"
            >
              <Avatar size="large" icon={<UserOutlined />} />

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-md border bg-white p-4 text-sm shadow-lg">
                  {/* <p className="mb-1 font-semibold">{user?.name}</p> */}
                  {/* {role === 'admin' && (
                    <>
                      <Link to="/admin/profile">Profile</Link>
                    </>
                  )} */}
                  {role === 'user' && <Link to="/user/updatePassword">Profile</Link>}
                  {/* <p className="mb-3 text-gray-500">{session?.user?.email}</p> */}
                  <button
                    onClick={handleSignOut}
                    className="w-full cursor-pointer rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="flex cursor-pointer items-center gap-2 hover:text-red-800">
                <Avatar size="large" icon={<UserOutlined />} />
                LogIn
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
